//once an adopter has swiped right on a shelterpet the shelter gets a request
//the request doc should contain shelterId, petId, other info, and adopterId, as well as docId, status is pending
const requestsDoc = doc(db, "shelters", shelter.id, "requests", request.id);
//if the shelter accepts the request a match is made, an accept button on shelter matches view
//once accept is pressed a match is created, the match is saved onto the shelter, the adopter
//the match should also be saved to the shelterpet



acceptOnPress = async () => {
    //set the request to accepted
    //grab shelter info from context
    //grab adopterRef with adopter.id which should be passed down when the adopter swipes right
    //create a match
    alert(`You have a match for ${pet.name}!`);
    //create a subcollection for the shelter with the matchData
    const matchData = {
        shelterRefId: shelter.id,
        adopterRefId: adopter.id,
        petRefId: pet.id,
      };
      //should matches and requests contain additional info if they already have a referenceId
//matches page will contain petName and image
//set 
const matchDoc = addDoc(db, "shelters", shelter.id, "matches");
const matchRef = doc(db, "matches", docRef.id);
await updateDoc(matchRef, { id: matchRef.id });
//repeat process above for adopter

//once that match doc is created shelter will get a popup/modal asking if they want to send a message
//if yes navigate to chat screen where a the shelter can initiate a conversation 
//adopter will have the match visible in their matches screen, if time allows a notification
   
}

rejectOnPress = async () => {
 //remove that adopter from shelter requests 
 const requestsDoc = doc(db, "shelters", shelter.id, "requests", request.id);
 await updateDoc(requestsDoc);// status is rejected
}