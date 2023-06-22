const myPersonalInfo = [
    ['Sheikh Mahmud', 'Software Developer at Vertical Screen and Current BU Grad Student', 'LinkedIn: https://www.linkedin.com/in/sheikh-m-984537140/'],
    ['Arnob (nickname', 'Descendant of Proud Islamic heritage', 'Facebook: https://www.facebook.com/sheikh.mahmud.140']
  ]

  // Function to iterate through the array of items
function populateMyPersonalInfoItems() {
    const personalInfoList = document.getElementById('personalInfoListId'); // grabbing from index.html's id.
  
    for (let i = 0; i < myPersonalInfo.length; i++) {
      const infoItem = document.createElement('li');
      const infoText = document.createTextNode(myPersonalInfo[i].join(' - '));
      infoItem.appendChild(infoText);
      personalInfoList.appendChild(infoItem);
    }
  }
  
  // Call the function to populate my personal info.
  populateMyPersonalInfoItems();