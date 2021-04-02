const { returns } = require("chai-spies")

/* Your Code Here */
function createEmployeeRecord(employeeArry) {
    const employeeObject = {firstName: employeeArry[0], familyName: employeeArry[1], title: employeeArry[2], payPerHour: employeeArry[3], timeInEvents: [], timeOutEvents: []}
    return employeeObject
}

function createEmployeeRecords(arryOfEmployeeArrys) {
    return arryOfEmployeeArrys.map( e => createEmployeeRecord(e))
}

function createTimeInEvent(timeStamp) {
    let stampSplit = timeStamp.split(' ')
    let date = stampSplit[0] 
    let hour = stampSplit[1] 
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })
    return this
}

function createTimeOutEvent(timeStamp) {
    let stampSplit = timeStamp.split(' ')
    let date = stampSplit[0] 
    let hour = stampSplit[1] 
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })
    return this
}

function hoursWorkedOnDate(formDate) {
    let timeInArry = this.timeInEvents
    let timeOutArry = this.timeOutEvents
    let timeInObject = timeInArry.find(e => e.date === formDate)
    let timeOutObject = timeOutArry.find(e => e.date === formDate)
    return (timeOutObject.hour - timeInObject.hour)/100
}

function wagesEarnedOnDate(formDate) {
    const wages = hoursWorkedOnDate.call(this, formDate) * this.payPerHour
    return wages
}



function findEmployeeByFirstName(srcArry, stringName) {
    return srcArry.find(e => e.firstName === stringName)
}

function calculatePayroll(arry) {
    return arry.reduce((memo, e)=>{
        return memo += allWagesFor(e)
    },0)
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}