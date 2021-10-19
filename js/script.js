$(document).ready(function () {
    $('.AddCandidate').click(function () {
        addCandidate();
    });
    $('.Evaluate').click(function () {
        sendData();
    });
    $('.cal-total-first-stage').click(function () {

        calTotal();
    });

    $('.evaluate-to-last').click(function () {
        evaluateToLast()
    });

    function addCandidate() {
        // $('.AddCandidate').on('click', function () {
        let numberOfCandidates = 0;
        numberOfCandidates = $("input[name='NumberCandidates']").val();
        let parsed = parseInt(numberOfCandidates);
        let totalNumOfCandidates = $('table.tableAllCandidates tr:gt(0) ').length; //So every pair of radio buttons can have unique name each
        if (isNaN(parsed)) {
            $('.alert').text('Please enter a number');
            numberOfCandidates = $("input[name='NumberCandidates']").val("");
        } else {
            $('.alert').text('');
            numberOfCandidates = parsed;
            let firstTable = $('.tableAllCandidates');
            for (let index = 0; index < parsed; index++) {
                firstTable.append(` <tr>
                    <td><input type="text" value="ahmad"></td>
                    <td><input type="email" value="email@email.com"></td>
                    <td><input type="phone" value="+1 (555) 160 8796"></td>
                    <td>
                        <div>
                            <input type="radio" id="male" name="gender${totalNumOfCandidates+index}" value="M" >
                            <label for="male">M</label>
                        </div>
        
                        <div>
                            <input type="radio" id="female" name="gender${totalNumOfCandidates+index}" value="F">
                            <label for="female">F</label>
                        </div>
                    </td>
                    <td><select name="AllScore1" id="AllScore1">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select></td>
                    <td><select name="AllScore2" id="AllScore1">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select></td>
                    <td><select name="AllScore3" id="AllScore1">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select></td>
                    <td><select name="AllScore4" id="AllScore1">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select></td>
                    <td>
                        <p class="total-score"></p>
                    </td>
                </tr>`);
            }
        }

        // });
    }



    function sendData() {
        let rowTableAllCandidates = $('table.tableAllCandidates tr:gt(0) ');

        let secondTable = $('.FirstStageCandidates');



        let inputTableAllCandidates;
        let inputGenderChecked;
        let optionTableAllCandidates;
        let groupOfCandidates = [];
        rowTableAllCandidates.each(function () {
            let candidate = {
                name: "",
                email: "",
                phone: "",
                gender: "",
                primaryScore: 0

            };
            inputTableAllCandidates = $(this).find("input");


            inputGenderChecked = $(this).find("input[name*='gender']:checked").val();


            candidate.name = inputTableAllCandidates[0].value;
            candidate.email = inputTableAllCandidates[1].value;
            candidate.phone = inputTableAllCandidates[2].value;
            candidate.gender = inputGenderChecked;
            // candidate.name = inputTableAllCandidates.index(0);

            optionTableAllCandidates = $(this).find('option:selected');
            let score = 0; //Primary score of the candidate
            optionTableAllCandidates.each(function () {

                score += parseInt($(this).val());
            });

            candidate.primaryScore = score / optionTableAllCandidates.length;
            $(this).find('.total-score').text(`${candidate.primaryScore}`);
            groupOfCandidates.push(candidate);
        });


        groupOfCandidates.forEach((el) => {

            if (typeof (el.gender) == "undefined") {
                $('.alert').text('Please check all genders');
            } else {
                $('.alert').text('');
            }
        })

        let femaleCandidates = groupOfCandidates.filter((element) => {
            return element.gender == 'F';
        });
        let maleCandidates = groupOfCandidates.filter((element) => {
            return element.gender == 'M';
        });

        let topMaleCandidates = maleCandidates.sort(function (a, b) {
            {
                return b.primaryScore - a.primaryScore
            }
        });

        let topFemaleCandidates = femaleCandidates.sort(function (a, b) {
            {
                return b.primaryScore - a.primaryScore
            }
        });
        console.log(topFemaleCandidates);

        if (groupOfCandidates.length > 30) { //If the total number of candidate are greater than 30
            if (topMaleCandidates.length < Math.ceil(groupOfCandidates.length / 2)) {
                topFemaleCandidates = topFemaleCandidates.slice(0, 30 - topMaleCandidates.length + 1);

            } else if (topFemaleCandidates.length < Math.ceil(groupOfCandidates.length / 2)) {
                topMaleCandidates = topMaleCandidates.slice(0, 30 - topFemaleCandidates.length + 1);
            } else { //Then the two genders can be equally distributed
                topMaleCandidates = topMaleCandidates.slice(0, 30 / 2 + 1);
                topFemaleCandidates = topFemaleCandidates.slice(0, 30 / 2 + 1);
            }
        }

        let topCandidates = [...topMaleCandidates, ...topFemaleCandidates]




        $('.FirstStageCandidates  tr:gt(0)').remove();
        for (let i = 0; i < topCandidates.length; i++) {
            secondTable.append(` <tr>
                <td><input type="text" value="ahmad"></td>
                <td><input type="email" value="email@email.com"></td>
                <td><input type="text" class="first-stage-score" value="${topCandidates[i].primaryScore}"></td>
                <td><select name="interviewGrade" id="interviewGrade">
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select></td
                <td>
                <td><p class="total-score"></p></td>  
                <td style="display:none"><p class="gender">${topCandidates[i].gender}</p></td>         
            </tr>`);
        }




        // calTotal(groupOfFirstStageCandidates);


    }

    function getFirstStageCandidates() {
        let rowFirstStageCandidates = $('table.FirstStageCandidates tr:gt(0) ');
        let inputTableFirstStageCandidates;
        let groupOfFirstStageCandidates = [];
        let InterviewGrade;
        rowFirstStageCandidates.each(function () {
            let candidate = {
                name: "",
                contact: "",
                firstStageScore: "",
                InterviewGrade: "",
                Total: 0

            };
            inputTableFirstStageCandidates = $(this).find("input");

            candidate.name = inputTableFirstStageCandidates[0].value;
            candidate.contact = inputTableFirstStageCandidates[1].value;
            candidate.firstStageScore = inputTableFirstStageCandidates[2].value;



            InterviewGrade = $(this).find('option:selected').val();
            candidate.InterviewGrade = InterviewGrade;

            candidate.Total = (parseInt(candidate.InterviewGrade) + parseInt(candidate.firstStageScore)) / 2;

            $('.first-stage-total-score').val(`${candidate.Total}`);
            groupOfFirstStageCandidates.push(candidate);
        });


        return groupOfFirstStageCandidates;

    }

    function getLastStageCandidates() {
        let rowFirstStageCandidates = $('table.FirstStageCandidates tr:gt(0) ');
        let groupOfLastStageCandidates = [];
        let CandidateName;
        let CandidateContact;
        let candidateGender;
        let finalGrade;
        rowFirstStageCandidates.each(function () {
            let candidate = {
                name: "",
                contact: "",
                gender: "",
                finalGrade: 0

            };
            inputTableFirstStageCandidates = $(this).find("input");

            candidate.name = inputTableFirstStageCandidates[0].value;
            candidate.contact = inputTableFirstStageCandidates[1].value;
            candidate.gender = $(this).find('.gender').text();
            candidate.finalGrade = $(this).find('.total-score').text();

            groupOfLastStageCandidates.push(candidate);
        });
        return groupOfLastStageCandidates;

    }


    function calTotal() {
        let candidate = getFirstStageCandidates();

        let rowFirstStageCandidates = $('table.FirstStageCandidates tr:gt(0) ');
        let firstStageScore;
        let InterviewGrade;
        let total = 0;
        rowFirstStageCandidates.each(function () {

            firstStageScore = $(this).find(".first-stage-score").val();
            InterviewGrade = $(this).find('option:selected').val();


            // candidate.InterviewGrade = InterviewGrade;
            $(this).find('.total-score').text(`${(parseInt(InterviewGrade) + parseInt(firstStageScore)) / 2}`);





        });
    }

    function evaluateToLast() {
        let thirdTable = $('.LastStageCandidates');
        let groupOfLastStageCandidates = getLastStageCandidates();
        let femaleCandidates = groupOfLastStageCandidates.filter((element) => {
            return element.gender == 'F';
        });
        let maleCandidates = groupOfLastStageCandidates.filter((element) => {
            return element.gender == 'M';
        });

        let topMaleCandidates = maleCandidates.sort(function (a, b) {
            {
                return b.finalGrade - a.finalGrade
            }
        });

        let topFemaleCandidates = femaleCandidates.sort(function (a, b) {
            {
                return b.finalGrade - a.finalGrade
            }
        });
        groupOfLastStageCandidates = [];
        groupOfLastStageCandidates = [...topMaleCandidates, ...topFemaleCandidates];


        if (groupOfLastStageCandidates.length > 10) { //If the total number of candidate are greater than 30
            if (topMaleCandidates.length < 10 / 2) {
                topFemaleCandidates = topFemaleCandidates.slice(0, 10 - topMaleCandidates.length + 1);

            } else if (topFemaleCandidates.length < 10 / 2) { //10 which is the needed number of candidates
                topMaleCandidates = topMaleCandidates.slice(0, 10 - topFemaleCandidates.length + 1);
            } else { //Then the two genders can be equally distributed
                topMaleCandidates = topMaleCandidates.slice(0, 10 / 2 + 1);
                topFemaleCandidates = topFemaleCandidates.slice(0, 10 / 2 + 1);
            }
        }

        let topFinalStageCandidates = [...topMaleCandidates, ...topFemaleCandidates];
        topFinalStageCandidates = topFinalStageCandidates.sort(function (a, b) {
            return b.finalGrade - a.finalGrade;
        });

        $('.LastStageCandidates  tr:gt(0)').remove();
        for (let i = 0; i < topFinalStageCandidates.length; i++) {
            thirdTable.append(` <tr>
                <td><input type="text" value="${topFinalStageCandidates [i].name}"></td>
                <td><input type="email" value="${topFinalStageCandidates [i].contact}"></td>
                <td><p class="final-grade">${topFinalStageCandidates [i].finalGrade}</p></td>             
            </tr>`);
        }

    }

});