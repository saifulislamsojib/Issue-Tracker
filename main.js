document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000);
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
  issueCount();
}

const issueCount = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const totalIssue = document.getElementById('total-issue');
  const openIssue = document.getElementById('open-issue');
  if (issues) {
    totalIssue.innerText = issues.length;
    const open = issues.filter(issue => issue.status == 'Open');
    openIssue.innerText = open.length;
  }
}
issueCount();

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  currentIssue.description = currentIssue.description.strike();
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  issueCount();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  issueCount();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  if (issues) {
    for (var i = 0; i < issues.length; i++) {
      const {id, description, severity, assignedTo, status} = issues[i];
  
      issuesList.innerHTML +=   `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                <button onclick="closeIssue(${id})" class="btn btn-warning">Close</button>
                                <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>
                                </div>`;
    }
  }
}
