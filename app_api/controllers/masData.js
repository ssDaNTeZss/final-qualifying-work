let mongoose = require('mongoose');
let token = mongoose.model('token');
const h = require('../helpers/common');
let fs = require('fs');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('../app_client/testdata/masData.json');
const db = low(adapter);

module.exports.update = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    if(req.body.headerAboutCollege){
        db.set('MAS[0].DataAboutCollege.HeaderAboutCollege', req.body.headerAboutCollege)
            .write();
    }

    if(req.body.textAboutCollege){
        db.set('MAS[0].DataAboutCollege.TextAboutCollege', req.body.textAboutCollege)
            .write();
    }

    if(req.body.headerWorkSchedule){
        db.set('MAS[1].DataWorkSchedule.HeaderWorkSchedule', req.body.headerWorkSchedule)
            .write();
    }

    if(req.body.textWorkSchedule){
        db.set('MAS[1].DataWorkSchedule.TextWorkSchedule', req.body.textWorkSchedule)
            .write();
    }

    if(req.body.positionGovernance){
        if (req.body.indexGovernance == 0) {
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Director.Position', req.body.positionGovernance)
                .write();
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Director.FullName', req.body.fullNameGovernance)
                .write();
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Director.Telephone', req.body.telephoneGovernance)
                .write();
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Director.Email', req.body.emailGovernance)
                .write();
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Director.Location', req.body.locationGovernance)
                .write();
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Director.Additionally', req.body.additionallyGovernance)
                .write();
        } else {
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Position', req.body.positionGovernance)
                .write();
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].FullName', req.body.fullNameGovernance)
                .write();
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Telephone', req.body.telephoneGovernance)
                .write();
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Email', req.body.emailGovernance)
                .write();
            db.set('MAS[2].Governance[' + req.body.indexGovernance + '].Location', req.body.locationGovernance)
                .write();
        }
    }
};