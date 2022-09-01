// Your code here
function createEmployeeRecord(employeeArr) {
  const  employeeRecord = {
    firstName: employeeArr[0],
    familyName: employeeArr[1],
    title: employeeArr[2],
    payPerHour: employeeArr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord
}

function createEmployeeRecords(nestedArr){
  let employeeRecords = []
  nestedArr.map(element => employeeRecords.push(createEmployeeRecord(element)))  
  return employeeRecords
}

function splitDateStamp(dateStamp) {
  return dateStamp.split(' ')
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const timeStampArr = splitDateStamp(dateStamp)
  // return employeeRecord
  employeeRecord['timeInEvents'].push({
    type: "TimeIn",
    hour: parseInt(timeStampArr[1]),
    date: timeStampArr[0]
  })
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const timeStampArr = splitDateStamp(dateStamp)
  // return employeeRecord
  employeeRecord['timeOutEvents'].push({
    type: "TimeOut",
    hour: parseInt(timeStampArr[1]),
    date: timeStampArr[0]
  })
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
  const timeStampArr = splitDateStamp(dateStamp)
  const timeIn = employeeRecord.timeInEvents.find(record => record.date === timeStampArr[0])
  const timeOut = employeeRecord.timeOutEvents.find(record => record.date === timeStampArr[0])

  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
  return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, dateStamp)
}

function allWagesFor(employeeRecord) {
  return employeeRecord.timeInEvents.map(element => wagesEarnedOnDate(employeeRecord, element.date)).reduce((a,b) => a + b)
}

function calculatePayroll(employees) {
  return employees.map(employee => allWagesFor(employee)).reduce((a,b) => a + b)
}
