let mongoose = require('mongoose');
let token = mongoose.model('token');
const h = require('../helpers/common');


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

    if(req.body.titleEnrolleeNews){
        db.set('MAS[5].NewsForEnrollee[' + req.body.indexEnrolleeNews + '].Title', req.body.titleEnrolleeNews)
            .write();
        db.set('MAS[5].NewsForEnrollee[' + req.body.indexEnrolleeNews + '].Subtitle', req.body.subtitleEnrolleeNews)
            .write();
        db.set('MAS[5].NewsForEnrollee[' + req.body.indexEnrolleeNews + '].Text', req.body.textEnrolleeNews)
            .write();
    }

    if(req.body.titleStudentNews){
        db.set('MAS[6].NewsForStudents[' + req.body.indexStudentNews + '].Title', req.body.titleStudentNews)
            .write();
        db.set('MAS[6].NewsForStudents[' + req.body.indexStudentNews + '].Subtitle', req.body.subtitleStudentNews)
            .write();
        db.set('MAS[6].NewsForStudents[' + req.body.indexStudentNews + '].Text', req.body.textStudentNews)
            .write();
    }

    if (req.body.timeToReturn){
        db.set('ConnectionSetup.TimeToReturn', req.body.timeToReturn)
            .write();
    }

    if (req.body.urlForSchedule){
        db.set('ConnectionSetup.UrlForSchedule', req.body.urlForSchedule)
            .write();
    }

    if (req.body.headFirstBuilding){
        db.set('MAS[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization.HeadFirstBuilding', req.body.headFirstBuilding)
            .write();
        db.set('MAS[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization.TextFirstBuilding', req.body.textFirstBuilding)
            .write();
        db.set('MAS[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization.HeadSecondBuilding', req.body.headSecondBuilding)
            .write();
        db.set('MAS[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization.TextSecondBuilding', req.body.textSecondBuilding)
            .write();
        db.set('MAS[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization.HeadCollegeGoverningBodies', req.body.headCollegeGoverningBodies)
            .write();
        db.set('MAS[3].StructureAndGoverningBodies.StructureOfTheEducationalOrganization.TextCollegeGoverningBodies', req.body.textCollegeGoverningBodies)
            .write();
    }

    if (req.body.name){
        db.set('MAS[3].StructureAndGoverningBodies.StructuralUnits[' + req.body.index + '].Name', req.body.name)
            .write();
        db.set('MAS[3].StructureAndGoverningBodies.StructuralUnits[' + req.body.index + '].Manager', req.body.manager)
            .write();
        db.set('MAS[3].StructureAndGoverningBodies.StructuralUnits[' + req.body.index + '].Email', req.body.email)
            .write();
        db.set('MAS[3].StructureAndGoverningBodies.StructuralUnits[' + req.body.index + '].Telephone', req.body.telephone)
            .write();
        db.set('MAS[3].StructureAndGoverningBodies.StructuralUnits[' + req.body.index + '].Location', req.body.location)
            .write();
    }
    h.sendJsonResponse(res, 200);
};

module.exports.delete = async (req, res, next) => {
    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    // db.get('MAS[5].EnrolleeNews[1]')
    //     .remove('Subtitle')
    //     .write();

    if (req.params.index) {
        db.unset('MAS[5].NewsForEnrollee[' + req.params.index + ']')
            .write();

    }
};

module.exports.create = async function (req, res) {
    // db.set('MAS[4].UploadImg[0].name', req.body.name)
    //     .write();
    // db.set('MAS[4].UploadImg[0].imageSrc', req.file ? req.file.path : '')
    //     .write();

    if(req.body.titleEnrolleeNews) {
        db.set('MAS[5].NewsForEnrollee[' + req.body.indexMAX + '].Title', req.body.titleEnrolleeNews)
            .write();
        db.set('MAS[5].NewsForEnrollee[' + req.body.indexMAX + '].Subtitle', req.body.subtitleEnrolleeNews)
            .write();
        db.set('MAS[5].NewsForEnrollee[' + req.body.indexMAX + '].Text', req.body.textEnrolleeNews)
            .write();

        // db.set('MAS[5].NewsForEnrollee[' + req.body.indexEnrolleeNews + '].Subtitle', req.body.subtitleEnrolleeNews)
        //     .write();
        // db.set('MAS[5].NewsForEnrollee[' + req.body.indexEnrolleeNews + '].Text', req.body.textEnrolleeNews)
        //     .write();
    }
};