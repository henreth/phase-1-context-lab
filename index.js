/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
 
let createEmployeeRecord = (info)=>{
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = (empList)=>{
    return empList.map((info)=>{
        return createEmployeeRecord(info)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateForm){
    let [date, hour] = dateForm.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(dateForm){
    let inRecord = this.timeInEvents.find(record=>{
        return record.date === dateForm;
    });

    let outRecord = this.timeOutEvents.find(record=>{
        return record.date === dateForm;
    });

    return (outRecord.hour - inRecord.hour) / 100;
}

let wagesEarnedOnDate = function(dateForm){
    return hoursWorkedOnDate.call(this,dateForm) * this.payPerHour;
}

let findEmployeeByFirstName = (srcArray,firstName)=>{
    return srcArray.find(emp=>{return emp.firstName===firstName})
}

let calculatePayroll = (empList) => {
    return empList.reduce( (tot,emp) => {
        return tot+=allWagesFor.call(emp);
    },0);
}
