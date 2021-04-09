<?php

function main_handler($event, $context)
{
    return api_response("text/plain", $event->requestContext->sourceIp);
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
