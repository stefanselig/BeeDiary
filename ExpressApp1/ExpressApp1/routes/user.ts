/// <reference path="../Scripts/typings/express/express.d.ts" />
/*
 * GET users listing.
 */
import express = require('express');

export function list(req: express.Request, res: express.Response) {
    //res.send("respond with a resource");
    res.render("user", {title:"abc"});
};