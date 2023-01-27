function assignSeats(seatMap, passengerCount, priority) {
    if (priority === void 0) { priority = ['A', 'W', 'M']; }
    var assignmentMap = {};
    var order = [];
    priority.forEach(function (priority) {
        order = order.concat(filterSeats(seatMap, priority));
    });
    order.slice(0, passengerCount).forEach(function (item, index) {
        assignmentMap[item[0]] = {
            seatType: seatMap[item[0]],
            passengerNumber: index,
        };
    });
    return assignmentMap;
}
function buildSeatMapping(layout) {
    var seats = {};
    var rows = layout.map(function (_) { return _[1]; });
    for (var rowIndex = 0, rowLength = rows.length; rowIndex < rowLength; rowIndex++) {
        for (var colIndex = 0, length_1 = layout.length; colIndex < length_1; colIndex++) {
            if (rowIndex < layout[colIndex][1]) {
                var columnSeatMap = layout[colIndex];
                var columns = columnSeatMap[0];
                for (var innerColIndex = 0, colLength = columns; innerColIndex < colLength; innerColIndex++) {
                    var seatType = void 0;
                    if (colIndex === 0) {
                        // Left edge.
                        if (innerColIndex === 0) {
                            seatType = 'W';
                        }
                        else if (innerColIndex === colLength - 1) {
                            seatType = 'A';
                        }
                        else {
                            seatType = 'M';
                        }
                    }
                    else if (colIndex === length_1 - 1) {
                        // Right edge.
                        if (innerColIndex === 0) {
                            seatType = 'A';
                        }
                        else if (innerColIndex === colLength - 1) {
                            seatType = 'W';
                        }
                        else {
                            seatType = 'M';
                        }
                    }
                    else {
                        // Middle.
                        if (innerColIndex === 0 || innerColIndex === colLength - 1) {
                            seatType = 'A';
                        }
                        else {
                            seatType = 'M';
                        }
                    }
                    seats[colIndex + "_" + innerColIndex + "_" + rowIndex] = seatType;
                }
            }
        }
    }
    return seats;
}
function filterSeats(seatMap, seatType) {
    return Object.entries(seatMap).filter(function (_) { return _[1] === seatType; });
}

function printSeatAssignments(layout, assignmentMap) {
    var rows = layout.map(function (_) { return _[1]; });
    for (var rowIndex = 0, rowLength = rows.length; rowIndex < rowLength; rowIndex++) {
        var row = [];
        for (var colIndex = 0, length_2 = layout.length; colIndex < length_2; colIndex++) {
            var columnSeatMap = layout[colIndex];
            var columns = columnSeatMap[0];
            if (rowIndex < layout[colIndex][1]) {
                for (var innerColIndex = 0, colLength = columns; innerColIndex < colLength; innerColIndex++) {
                    var seatKey = colIndex + "_" + innerColIndex + "_" + rowIndex;
                    var seat = assignmentMap[seatKey];
                    if (seat) {
                        row.push(((seat.passengerNumber + 1).toString().padStart(2)));
                    }
                    else {
                        row.push(('00'.padStart(2)));
                    }
                }
            }
            else {
                row.push('——|'.repeat(columns));
            }
            row.push('    ');
        }
        console.log(row.map(function (r) {
            if (r.endsWith('|')) {
                return r.slice(0, r.length - 1);
            }
            return r;
        }).join('|'));
    }

}

    //printing result
    const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter an array of arrays in the format [[1,1],[2,2],[3,3],[4,4]]: ', (input) => {
  const layout = JSON.parse(input);
  rl.question('Please enter a number: ', (input) => {
    const passengerCount = parseInt(input);
    var seatMap = buildSeatMapping(layout);
        var assignmentMap = assignSeats(seatMap, passengerCount);
        printSeatAssignments(layout, assignmentMap);
    rl.close();
  });
});

        
    
  