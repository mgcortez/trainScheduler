$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDRciPHas5KvkRAdbqDo_Dq_uV9TehLpzI",
        authDomain: "trainapp-bbf94.firebaseapp.com",
        databaseURL: "https://trainapp-bbf94.firebaseio.com",
        projectId: "trainapp-bbf94",
        storageBucket: "trainapp-bbf94.appspot.com",
        messagingSenderId: "243705962140"
    };
    firebase.initializeApp(config);


    var database = firebase.database();


    var table = $("<tbody>");
    $("table").append(table);



    $("#submitButton").on("click", function(event) {
        //stops default actions on a form from happening. Such as prevent a submit button from submitting form.
        event.preventDefault();


        var trainName = $("#trainNameInputTextBox").val().trim(),
            destination = $("#destinationInputTextBox").val().trim(),
            firstTrain = $("#firstTrainTimeInputTextBox").val().trim(),
            frequency = $("#frequencyInputTextBox").val().trim();



        newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency

        };




        database.ref().push(newTrain);


        $("#trainNameInputTextBox").val("");
        $("#destinationInputTextBox").val("");
        $("#frequencyInputTextBox").val("");
        $("#firstTrainTimeInputTextBox").val("");

        return false;


    });



    database.ref().on("child_added", function(childSnapshot) {
        //    console.log(childSnapshot);

        var trainName = childSnapshot.val().trainName,
            destination = childSnapshot.val().destination,
            frequency = childSnapshot.val().frequency;





        console.log(trainName, destination, frequency);



        var trainFrequency = childSnapshot.val().frequency;



        var firstTrainTime = childSnapshot.val().firstTrain;
        //console.log(firstTrainTime);

        var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        // console.log(firstTrainTimeConverted);

        var currentTime = moment();
        //console.log("Current Time: " + moment(currentTime).format("HH:mm"));

        var timeDiff = moment().diff(moment(firstTrainTimeConverted), "minutes");
        //console.log("Difference in Time: " + timeDiff);


        var timeRemainder = timeDiff % trainFrequency;
        //console.log(timeRemainder);



        var minutesTilTrain = trainFrequency - timeRemainder;
        //console.log("Minutes til next train: " + minutesTilTrain);


        //next train arrival time
        var nextTrain = moment().add(minutesTilTrain, "minutes");
        var result = moment(nextTrain).format("HH:mm");




        $("tbody").append(
            "<tr>" +
            "<td>" + trainName +
            "<td>" + destination +
            "<td>" + frequency +
            "<td>" + result +
            "<td>" + minutesTilTrain
        );



    });







































});