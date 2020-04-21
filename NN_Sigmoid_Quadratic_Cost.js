class Matrix {
    constructor(row, col, rand) {
        if (arguments.length === 1) {
            var arr = row;
            this.rowNum = arr.length;
            this.colNum = 1;
            this.matrix = new Array();
            this.matrix.push(arr);

        } else {
            this.rowNum = row;
            this.colNum = col;
            this.matrix = new Array();
            if (rand) {
                for (var i = 0; i < col; ++i) {
                    var mat = new Array();
                    for (var j = 0; j < row; ++j) {
                        mat.push(0.1 * Math.random())
                    }
                    this.matrix.push(mat);
                }
            } else {
                for (var i = 0; i < col; ++i) {
                    var mat = new Array();
                    for (var j = 0; j < row; ++j) {
                        mat.push(0);
                    }
                    this.matrix.push(mat);
                }
            }
        }
    }

    getRowNum() {
        return this.rowNum;
    }

    getColNum() {
        return this.colNum;
    }

    setLabel(l) {
        this.label = l;
    }

    getLabel() {
        return this.label;
    }

    getColumn(index) {
        return this.matrix[index];
    }

    getEntry(rowIndex, colIndex) {
        var a = new Array();
        a = this.matrix[colIndex];
        return a[rowIndex];
        
    }

    setEntry(rowIndex, colIndex, val) {
        (this.matrix[colIndex]) [rowIndex] = val;
    }

    clone() {
        var result = new Matrix(this.rowNum, this.colNum, false);
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                result.setEntry(i, j, this.getEntry(i, j));
            }
        }
        return result;
    }

    mult(mat2) {
        if (typeof mat2 == "object") {
            var result = new Matrix(this.rowNum, mat2.getColNum(), false);
            var accu = 0;
            for (var i = 0; i < this.rowNum; ++i) {
                for (var j = 0; j < mat2.getColNum(); ++j) {
                    for (var m = 0; m < this.colNum; ++m) {
                        accu += this.getEntry(i, m) * mat2.getEntry(m, j);
                    }
                    result.setEntry(i, j, accu);
                    accu = 0;
                }
            }
            return result;
        } else if (typeof mat2 == "number") {
            var result1 = new Matrix(this.rowNum, this.colNum, false);
            for (var i = 0; i < this.rowNum; ++i) {
                for (var j = 0; j < this.colNum; ++j) {
                    result1.setEntry(i, j, this.getEntry(i, j) * mat2);
                }
            }
            return result1;
        }
    }

    add(mat2) {
        var result = new Matrix(this.rowNum, this.colNum, false);
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                result.setEntry(i, j, this.getEntry(i, j) + mat2.getEntry(i, j));
            }
        }
        return result;
    }

    minus(mat2) {
        var result = new Matrix(this.rowNum, this.colNum, false);
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                result.setEntry(i, j, this.getEntry(i, j) - mat2.getEntry(i, j));
            }
        }
        return result;
    }

    hadamard(mat2) {
        var result = new Matrix(this.rowNum, this.colNum, false);
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                result.setEntry(i, j, this.getEntry(i, j) * mat2.getEntry(i, j));
            }
        }
        return result;
    }

    transpose() {
        var result = new Matrix(this.colNum, this.rowNum, false);
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                result.setEntry(j, i, this.getEntry(i, j));
            }
        }
        return result;
    }

    sigmoidMatrix() {
        var result = new Matrix(this.rowNum, this.colNum, false);
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                result.setEntry(i, j, Matrix.sigmoid(this.getEntry(i, j)));
            }
        }
        return result;
    }

    sigmoidPrimeMatrix() {
        var result = new Matrix(this.rowNum, this.colNum, false);
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                result.setEntry(i, j, Matrix.sigmoidPrime(this.getEntry(i, j)));
            }
        }
        return result;
    }

    equal(mat2) {
        if ((this.rowNum != mat2.rowNum) || (this.colNum != mat2.colNum)) {
            return false;
        }
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                if (this.getEntry(i, j) != mat2.getEntry(i, j)) {
                    return false;
                }
            }
        }
        return true;
    }

    maxIndex(mat2) {
        if ((this.rowNum != mat2.rowNum) || (this.colNum != mat2.colNum)) {
            return false;
        }
        var index1 = 0;
        var index2 = 0;
        var max1 = Number.NEGATIVE_INFINITY;
        var max2 = Number.NEGATIVE_INFINITY;
        var walker = 0;
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                if (this.getEntry(i, j) > max1) {
                    max1 = this.getEntry(i, j);
                    index1 = walker;
                }
                if (mat2.getEntry(i, j) > max2) {
                    max2 = mat2.getEntry(i, j);
                    index2 = walker;
                }
                ++walker;
            }
        }
        if (index1 == index2) {
            return true;
        } else {
            return false;
        }
    }

    vectorize() {
        var result = new Matrix(this.rowNum * this.colNum, 1, false);
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                result.setEntry(i * this.colNum + j, 0, this.getEntry(i, j));
            }
        }
        return result;
    }

    static sigmoid(val) {
        return 1 / (1 + Math.exp(-val));
    }

    static sigmoidPrime(val) {
        return Matrix.sigmoid(val) * (1 - Matrix.sigmoid(val));
    }

}

//import { Matrix } from "./Matrix.js";

class WBPair {
    constructor(w, b) {
        this.weights = new Array();
        this.biases = new Array();
        this.weights = w;
        this.biases = b;
    }

    getWeightsAt(index) {
        return this.weights[index];
    }

    getBiasesAt(index) {
        return this.biases[index];
    }

    add(wb2) {
        var resultW = new Array();
        var resultB = new Array();
        for (var i = 0; i < this.weights.length; ++i) {
            resultW.push(this.weights[i].add(wb2.getWeightsAt(i)));
        }
        for (var j = 0; j < this.biases.length; ++j) {
            resultB.push(this.biases[j].add(wb2.getBiasesAt(j)));
        }
        return new WBPair(resultW, resultB);
    }

    minus(wb2) {
        var resultW = new Array();
        var resultB = new Array();
        for (var i = 0; i < this.weights.length; ++i) {
            resultW.push(this.weights[i].minus(wb2.getWeightsAt(i)));
        }
        for (var j = 0; j < this.biases.length; ++j) {
            resultB.push(this.biases[j].minus(wb2.getBiasesAt(j)));
        }
        return new WBPair(resultW, resultB);
    }

    mult(val) {
        var resultW = new Array();
        var resultB = new Array();
        for (var i = 0; i < this.weights.length; ++i) {
            resultW.push(this.weights[i].mult(val));
        }
        for (var j = 0; j < this.biases.length; ++j) {
            resultB.push(this.biases[j].mult(val));
        }
        return new WBPair(resultW, resultB);
    }

    divide(val) {
        var resultW = new Array();
        var resultB = new Array();
        for (var i = 0; i < this.weights.length; ++i) {
            resultW.push(this.weights[i].mult(1 / val));
        }
        for (var j = 0; j < this.biases.length; ++j) {
            resultB.push(this.biases[j].mult(1 / val));
        }
        return new WBPair(resultW, resultB);
    }
}



//import { Matrix } from "./Matrix.js";
//import { WBPair } from "./WBPair.js";

class NeuralNetwork_Sigmoid_Quadratic_Cost {
    constructor(lyers) {
        this.layers = lyers;
        var len = this.layers.length;
        this.weights = new Array();
        this.biases = new Array();

        for (var i = 1; i < len; ++i) {
            this.weights.push(new Matrix(this.layers[i], this.layers[i - 1], true));
            this.biases.push(new Matrix(this.layers[i], 1, true));
        }
    }

    update(wb, rate) {
        var len = this.layers.length;
        for (var i = 0; i < len - 1; ++i) {
            this.weights[i] = this.weights[i].minus(wb.getWeightsAt(i).mult(rate));
            this.biases[i] = this.biases[i].minus(wb.getBiasesAt(i).mult(rate));
        }
    }

    feedforward(input) {
        var container = this.weights[0].mult(input).add(this.biases[0]);
        container = container.sigmoidMatrix();
        for (var i = 1; i < this.weights.length; ++i) {
            container = this.weights[i].mult(container).add(this.biases[i]);
            container = container.sigmoidPrime()
        }
        return container;
    }

    feedforwardRawAt(input, index) {
        if (index == 0) {
            return input;
        }
        if (index == 1) {
            return this.weights[0].mult(input).add(this.biases[0]);
        }
        var result = this.weights[0].mult(input).add(this.biases[0]);
        for (var i = 1; i < index; ++i) {
            result = result.sigmoidMatrix();
            result = this.weights[i].mult(result).add(this.biases[i]);
        }
        return result;
    }

    feedforwardOutputAt(input, index) {
        if (index == 0) {
            return input;
        } else {
            return this.feedforwardRawAt(input, index).sigmoidMatrix();
        }
    }

    backPropagate(input, expect) {

        var len = this.layers.length;
        var errors = new Array();
        var weights_delta = new Array();
        var biases_delta = new Array();

        var rawOutput = new Array();
        var sigmoidOutput = new Array();
        var walker = input.clone();
        rawOutput.push(walker);
        sigmoidOutput.push(walker);

        for (var w = 0; w < len - 1; ++w) {
            walker = this.weights[w].mult(walker).add(this.biases[w]);
			rawOutput.push(walker);
			walker = walker.sigmoidMatrix();
			sigmoidOutput.push(walker);
        }

        var output = sigmoidOutput[len - 1];
        var gradientC = output.minus(expect);
        var errorL = gradientC.hadamard(rawOutput[len - 1].sigmoidPrimeMatrix());

        errors.push(errorL);

        for (var j = len - 2; j > 0; --j) {
            errors.push(this.weights[j].transpose().mult(errors[len - 2 - j]).hadamard(rawOutput[j].sigmoidPrimeMatrix()));
        }
        errors.reverse();

        biases_delta = errors;
        for (var i = 0; i < len - 1; ++i) {
            weights_delta.push(errors[i].mult(sigmoidOutput[i].transpose()));
        }

        return new WBPair(weights_delta, biases_delta);
    }
    
    cost(input, expect) {
        var output = this.feedforward(input);
        var diff = expect.minus(output);
        var result = 0;
        for (var i = 0; i < diff.getRowNum(); ++i) {
            result += Math.pow(diff.getEntry(i, 0), 2);
        }
        return result / 2;
    }

    test(data) {
        var total = data.length;
        var correct = 0;
        for (var i = 0; i < total; ++i) {
            if (this.feedforward(data[i][0]).maxIndex(data[i][1])) {
                ++correct;
                console.log("Case " + i + " passed\n");
            } else {
                console.log("Case " + i + " failed\n");
            }
        }
        return correct / total;
    }

    train(data, rate, epoch) {
        var size = data.length;
        for (var i = 0; i < epoch; ++i) {
            //var cost = 0;
            for (var j = 0; j < size; ++j) {
                var wb = this.backPropagate(data[j][0], data[j][1]);
                //c += this.cost(data[j][0], data[j][1]);
                this.update(wb, rate);
            }
        }
    }

    trainStochasticUnmonitored(data, batchSize, rate, epoch) {
        for (let e = 0; e < epoch; ++e) {
            data = this.shuffle(data);
            var size = data.length;
			var batchNum = size / batchSize;
			var lastBatchSize = size % batchSize;
			var c = 0;
			if (lastBatchSize == 0) {
				
				for (let i = 0; i < batchNum; ++i) {
					let w = new Array();
					let b = new Array();
					
					for (let p = 1; p < this.layers.length; ++p) {
						w.push(new Matrix(this.layers[p], this.layers[p - 1], false));
						b.push(new Matrix(this.layers[p], 1, false));
					}
					let wb = new WBPair(w, b); 
					for (let j = 0; j < batchSize; ++j) {
						wb = wb.add(this.backPropagate(data[i * batchSize + j][0], data[i * batchSize + j][1]));
						c += this.cost(data[i * batchSize + j][0], data[i * batchSize + j][1]);
					}
					wb = wb.divide(batchSize);
					this.update(wb, rate);
				}
				
			} else {
				
				for (let i = 0; i < batchNum - 1; ++i) {
					let w = new Array();
					let b = new Array();
					
					for (var p = 1; p < this.layers.length; ++p) {
						w.push(new Matrix(this.layers[p], this.layers[p - 1], false));
						b.push(new Matrix(this.layers[p], 1, false));
					}
					let wb = new WBPair(w, b); 
					for (var j = 0; j < batchSize; ++j) {
						wb = wb.add(this.backPropagate(data[i * batchSize + j][0], data[i * batchSize + j][1]));
						c += this.cost(data[i * batchSize + j][0], data[i * batchSize + j][1]);
					}
					wb = wb.divide(batchSize);
					this.update(wb, rate);
				}
                
                let w = new Array();
				let b = new Array();
					
				for (let i = 1; i < this.layers.length; ++i) {
					w.push(new Matrix(this.layers[i], this.layers[i - 1], false));
					b.push(new Matrix(this.layers[i], 1, false));
                }					
                let wb = new WBPair(w, b); 

				for (let p = 0; p < lastBatchSize; ++p) {
					
					
					wb = wb.add(this.backPropagate(data[(batchNum - 1) * batchSize + p][0], data[(batchNum - 1) * batchSize + p][1]));
					c += this.cost(data[(batchNum - 1) * batchSize + p][0], data[(batchNum - 1) * batchSize + p][1]);
					
					
                }
                wb = wb.divide(lastBatchSize);
				this.update(wb, rate);
				
			}
			console.log(`${c / size}\\n`)
		}
		console.log("Training completed.")
    }

    trainStochasticMonitored(data, testdata, batchSize, rate, epoch) {
        for (let e = 0; e < epoch; ++e) {
            data = this.shuffle(data);
            var size = data.length;
			var batchNum = size / batchSize;
			var lastBatchSize = size % batchSize;
			var c = 0;
			if (lastBatchSize == 0) {
				
				for (let i = 0; i < batchNum; ++i) {
					let w = new Array();
					let b = new Array();
					
					for (let p = 1; p < this.layers.length; ++p) {
						w.push(new Matrix(this.layers[p], this.layers[p - 1], false));
						b.push(new Matrix(this.layers[p], 1, false));
					}
					let wb = new WBPair(w, b); 
					for (let j = 0; j < batchSize; ++j) {
						wb = wb.add(this.backPropagate(data[i * batchSize + j][0], data[i * batchSize + j][1]));
						c += this.cost(data[i * batchSize + j][0], data[i * batchSize + j][1]);
					}
					wb = wb.divide(batchSize);
					this.update(wb, rate);
				}
				
			} else {
				
				for (let i = 0; i < batchNum - 1; ++i) {
					let w = new Array();
					let b = new Array();
					
					for (var p = 1; p < this.layers.length; ++p) {
						w.push(new Matrix(this.layers[p], this.layers[p - 1], false));
						b.push(new Matrix(this.layers[p], 1, false));
					}
					let wb = new WBPair(w, b); 
					for (var j = 0; j < batchSize; ++j) {
						wb = wb.add(this.backPropagate(data[i * batchSize + j][0], data[i * batchSize + j][1]));
						c += this.cost(data[i * batchSize + j][0], data[i * batchSize + j][1]);
					}
					wb = wb.divide(batchSize);
					this.update(wb, rate);
				}
                
                let w = new Array();
				let b = new Array();
					
				for (let i = 1; i < this.layers.length; ++i) {
					w.push(new Matrix(this.layers[i], this.layers[i - 1], false));
					b.push(new Matrix(this.layers[i], 1, false));
                }					
                let wb = new WBPair(w, b); 

				for (let p = 0; p < lastBatchSize; ++p) {
					
					
					wb = wb.add(this.backPropagate(data[(batchNum - 1) * batchSize + p][0], data[(batchNum - 1) * batchSize + p][1]));
					c += this.cost(data[(batchNum - 1) * batchSize + p][0], data[(batchNum - 1) * batchSize + p][1]);
					
					
                }
                wb = wb.divide(lastBatchSize);
				this.update(wb, rate);
				
			}
            console.log(`${c / size}\\n`)
            console.log(`Accuracy: ${this.test(testdata)}\\n`)
		}
		console.log("Training completed.")
    }
    
    
    // From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }
}

var testlayers = new Array(16, 4);
var net = new NeuralNetwork_Sigmoid_Quadratic_Cost(testlayers);

var zero = new Matrix(new Array(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
var one = new Matrix(new Array(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
var two = new Matrix(new Array(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
var three = new Matrix(new Array(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
var four = new Matrix(new Array(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
var five = new Matrix(new Array(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
var six = new Matrix(new Array(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0));
var seven = new Matrix(new Array(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0));
var eight = new Matrix(new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0));
var nine = new Matrix(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0));
var ten = new Matrix(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0));
var ele = new Matrix(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0));
var twel = new Matrix(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0));
var thir = new Matrix(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0));
var fourt = new Matrix(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0));
var fif = new Matrix(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1));

var ezero = new Matrix(new Array(0,0,0,0));
		
var eone = new Matrix(new Array(0,0,0,1));

var etwo = new Matrix(new Array(0,0,1,0));

var ethree = new Matrix(new Array(0,0,1,1));

var efour = new Matrix(new Array(0,1,0,0));

var efive = new Matrix(new Array(0,1,0,1));

var esix = new Matrix(new Array(0,1,1,0));

var eseven = new Matrix(new Array(0,1,1,1));

var eeight = new Matrix(new Array(1,0,0,0));

var enine = new Matrix(new Array(1,0,0,1));

var eten = new Matrix(new Array(1,0,1,0));

var eele = new Matrix(new Array(1,0,1,1));

var etwelve = new Matrix(new Array(1,1,0,0));

var ethir = new Matrix(new Array(1,1,0,1));

var efourt = new Matrix(new Array(1,1,1,0));

var efif = new Matrix(new Array(1,1,1,1));

var trainData = new Array();
trainData.push(new Array(zero, ezero));
trainData.push(new Array(one, eone));
trainData.push(new Array(two, etwo));
trainData.push(new Array(three, ethree));
trainData.push(new Array(four, efour));
trainData.push(new Array(five, efive));
trainData.push(new Array(six, esix));
trainData.push(new Array(seven, eseven));
trainData.push(new Array(eight, eeight));
trainData.push(new Array(nine, enine));
trainData.push(new Array(ten, eten));
trainData.push(new Array(ele, eele));
trainData.push(new Array(twel, etwelve));
trainData.push(new Array(thir, ethir));
trainData.push(new Array(fourt, efourt));
trainData.push(new Array(fif, efif));

console.log(net.test(trainData));
net.trainStochasticUnmonitored(trainData, 4, 1, 60);
console.log(net.test(trainData));

