<?php

function main_handler($event, $context)
{
    $query = $event->queryString->query;
    $resp = queryLoop($query);

    return api_response("text/plain", $resp);
}

function queryLoop($query, $whois = "whois.iana.org")
{
    //$o = "\n------- whois: $whois -------\n";
    echo "\n------- whois: $whois -------\n";

    $resp = "\n--- from: $whois ---\n" . whois($query, $whois);
    //$o .= "------- resp:\n";
    echo "------- resp:\n";

    //$o .= $resp;
    echo $resp;

    $whoisNext = parseReferServer($resp);
    if ($whoisNext && $whoisNext != $whois) {
        $resp2 = queryLoop($query, $whoisNext);
        $resp = $resp . $resp2;
        //$o .= $resp;
    }

    return $resp;
}

function parseReferServer($msg)
{
    preg_match('/^\s*refer:\s*(\S+)\s*$/m', $msg, $matches);
    $whois = $matches[1];
    return $whois;
}

function parseWhoisServer($msg)
{
    preg_match('/^\s*whois:\s*(\S+)\s*$/m', $msg, $matches);
    $whois = $matches[1];
    if (!$whois) {
        preg_match('/^\s*Registrar\s*WHOIS\s*Server:\s*(\S+)\s*$/m', $msg, $matches);
        $whois = $matches[1];
    }
    return $whois;
}

function api_response($contentType, $content)
{
    $respObj = new stdClass();
    $respObj->isBase64Encoded = False;
    $respObj->statusCode = 200;
    $respObj->headers = array("Content-Type" => $contentType . "; charset=utf-8");
    $respObj->body = mb_convert_encoding($content, "UTF-8");

    return $respObj;
}

function whois($query, $host)
{
    $result = "";
    $fp = fsockopen($host, 43, $errno, $errstr, 4);
    if (!$fp) {
        echo "$errstr ($errno)\n";
    } else {
        $out = $query . "\r\n";
        fwrite($fp, $out);
        while (!feof($fp)) {
            $result .= fgets($fp, 128);
        }
        fclose($fp);
    }

    return $result;
}
