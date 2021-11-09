/*const SHEETID='1EDU9TFTKJPPF-X9GKD4bG4pmQjHCKspVn3Wk6OHYhic';
function doGet(e){
let ss= SpreadsheetApp.openById(SHEETID);//ss for spreadsheet
const sheet= ss.getSheetByName('All Candidates');
let rows= sheet.getDataRange().getValues();
Logger.log(rows);
return outputCandidates(rows);
}*/
FILE_ID='1EDU9TFTKJPPF-X9GKD4bG4pmQjHCKspVn3Wk6OHYhic';
function doGet(request) {
  const userEmail= Session.getActiveUser().getEmail();
  const fileID= FILE_ID;
  console.log(userEmail);
  const isValid= validate(userEmail, fileID);
  console.log(isValid);
  let htmlFile = (isValid)?'index':'NonUser';
  const html=HtmlService.createTemplateFromFile(htmlFile).evaluate();
  return html;
}

/*For giving access to the people that are only editor to google sheets */
function validate(email, fileID){
  let isValid=false;
  if (email=DriveApp.getFileById(fileID).getOwner().getEmail()) {
    isValid=true;
    return isValid;
  }
  
  const emailList= (()=>{
    var file;
    try{
      //get the file if the user has access to the sheets
      file= DriveApp.getFileById(fileID);
      //return true if the owner of the web app wants to access
    }catch(e){
      console.log(e);
    }
    return file.getEditors().map(editor=>{
      return editor.getEmail();
    })
  })();
  console.log(typeof emailList);

  if(!emailList){ 
  isValid= false; //It means that the user is not editor on the google sheets
  return isValid;
  }
  if(emailList.includes(email)){
    isValid=true;
  }
  return isValid;

}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


function outputCandidates(data){
const temp =JSON.stringify({
  status:'success',
  data: data
})
return ContentService.createTextOutput(temp);//So the script can view the data on a web app
}

function getAllCandidates(){
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Gets a different spreadsheet from Drive using
  // the spreadsheet's ID. 
  var candidateSpreadSheet = SpreadsheetApp.openById(
    "1EDU9TFTKJPPF-X9GKD4bG4pmQjHCKspVn3Wk6OHYhic" 
  );

  // Gets the sheet, data range, and values of the
  // spreadsheet stored in bookSS.
  var candidatesSheet = candidateSpreadSheet.getSheetByName("All Candidates");
  /**The method Sheet.getDataRange() returns the range containing all the non-empty cells in the sheet.  */
  var candidateRange = candidatesSheet.getDataRange();
  /**bookListValues is a 2D array containing all the values taken from the cells in bookRange */
  var candidateListValues = candidateRange.getValues();
  console.log(candidateListValues.values);
  return candidateListValues;
}

function addCandidate(data){
  try{
    let spreadsheetId='1EDU9TFTKJPPF-X9GKD4bG4pmQjHCKspVn3Wk6OHYhic';
    var candidatesSS=SpreadsheetApp.openById(spreadsheetId);
    var candidateSheet=candidatesSS.getSheetByName('All Candidates');
    candidateSheet.appendRow(data);
    return data;
  }catch(ex){
    return ex;
  }
}


function updateCandidate(data){
  try{
  let candidate=[];
  var sheet = SpreadsheetApp;
  var candidatesSS=sheet.openById('1EDU9TFTKJPPF-X9GKD4bG4pmQjHCKspVn3Wk6OHYhic');
  var candidateSheet=candidatesSS.getSheetByName('All Candidates');
  if(data.length>2){
  let range=`A${parseInt(data[0])+1}:I${parseInt(data[0])+1}`;
  candidate.push(data);
  candidateSheet.getRange(range).setValues(candidate);
  var result = candidatesSS.getRange(range);
  return result.getValues();
  }else{
    let range=`J${parseInt(data[0])+1}`;
    candidateSheet.getRange(range).setValue(data[1]);
    var result = candidatesSS.getRange(range).getValue();
    return result;
  }
  }catch(ex){
    return ex;
  }
}

function deleteCandidate(canRange){
  let range=parseInt(canRange)+1;
  var sheet = SpreadsheetApp;
  var candidatesSS=sheet.openById('1EDU9TFTKJPPF-X9GKD4bG4pmQjHCKspVn3Wk6OHYhic');
  var candidateSheet=candidatesSS.getSheetByName('All Candidates');
  candidateSheet.deleteRow(range);
}

function tester(){
  let data=[44, 'Ali Awji', 'email@email.com', 9616252627, 'M', 5, 8, 9, 2,1];
    let spreadsheetId='1EDU9TFTKJPPF-X9GKD4bG4pmQjHCKspVn3Wk6OHYhic';
    var candidatesSS=SpreadsheetApp.openById(spreadsheetId);
    var candidateSheet=candidatesSS.getSheetByName('All Candidates');
    candidateSheet.appendRow(data);
/*     var valueRange = Sheets.newRowData();
    valueRange.values=candidate;
    var appendRequest = Sheets.newAppendCellsRequest();
    appendRequest.sheetId = sheetID;
    appendRequest.rows = [valueRange];
    var result = Sheets.Spreadsheets.Values.append(valueRange, spreadsheetId, 'A45:J45', {
  valueInputOption: valueInputOption
}); */
    

  
}







