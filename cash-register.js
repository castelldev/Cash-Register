function checkCashRegister(price, cash, cid) {

    //Change deduction method
    let deduct = (key) => {
        //Unit deduction method
        let takeByUnit = (unitName, unitAmount) => {

            let taken = 0.0; //Track cash taken

            //Deduct change by specified unit amount
            while (change.toFixed(2) >= unitAmount && key[1] >= unitAmount) {
                change -= unitAmount;
                taken += unitAmount;
                taken = taken;
                key[1] -= unitAmount;
            }
            //console.log(`Taken:${taken} | ${[unitName, taken]} | Change left: ${change.toFixed(2)}`);

            //Check if change was taken from any slot
            if (taken !== 0)
                cashBack.push([unitName, taken]);

            return change.toFixed(2);
        };

        //Match denominations with respective value definitions
        //Pass unit values to unit deduction method
        switch (key[0]) {
            case "TWENTY":
                takeByUnit("TWENTY", 20);
                break;
            case "TEN":
                takeByUnit("TEN", 10);
                break;
            case "FIVE":
                takeByUnit("FIVE", 5);
                break
            case "ONE":
                takeByUnit("ONE", 1);
                break;
            case "QUARTER":
                takeByUnit("QUARTER", 0.25);
                break;
            case "DIME":
                takeByUnit("DIME", 0.10);
                break;
            case "NICKEL":
                takeByUnit("NICKEL", 0.05);
                break;
            case "PENNY":
                takeByUnit("PENNY", 0.01);
                break;
        }
    };

    /*BEGIN HERE*/
    //Check current drawer total amount
    let drawer = cid
        .map(obj => {
            return obj[1];
        })
        .reduce((sum, current) => {
            return sum + current;
        });
    drawer = parseFloat(drawer).toFixed(2);
    console.log(`In drawer: $${drawer}`);

    //Compute change amount
    let change = price < cash ? cash - price : drawer;
    console.log(`Change: $${change}`);

    //If drawer amount is less than change
    if (drawer < change) {
        return {
            "status": "INSUFFICIENT_FUNDS", "change": []
        };
    }
    //If drawer amount equals change
    if (drawer == change) {
        return {
            "status": "CLOSED", "change": cid
        };
    }

    //Split change into denominations and deduct
    //(reverse array traversal)
    let cashBack = [];
    for (let index = cid.length - 1; index >= 0; index--)
        deduct(cid[index]);

    console.log(`Total Change: $${change.toFixed(2)}`);
    console.log(`Cash Back: ${cashBack}`);

    //If change is available to be given out
    if (cashBack.length !== 0 && !(change > 0)) {
        return {
            "status": "OPEN", "change": cashBack
        };
    }
    else
        //If no change was taken due to insufficient amount in drawer
        return {
            "status": "INSUFFICIENT_FUNDS", "change": []
        };

    //If no condition is fulfilled, return null
    return null;
}

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));