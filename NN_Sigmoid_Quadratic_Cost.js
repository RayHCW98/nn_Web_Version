class Matrix {
    constructor(row, col, rand) {
        if (arguments.length === 1) {
            var img = new Array();
            img = row.image;
            
            this.rowNum = row.image.length;
            this.colNum = 1;
            this.matrix = new Array();
            this.matrix.push(img);
            this.label = row.label;

        } else {
            this.rowNum = row;
            this.colNum = col;
            this.matrix = new Array();
            if (rand) {
                for (var i = 0; i < col; ++i) {
                    var mat = new Array();
                    for (var j = 0; j < row; ++j) {
                        
                        mat.push(0.01 * Math.random())
                        
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

    maxIndex() {
        
        var index1 = 0;
        
        var max1 = Number.NEGATIVE_INFINITY;
        
        var walker = 0;
        for (var i = 0; i < this.rowNum; ++i) {
            for (var j = 0; j < this.colNum; ++j) {
                if (this.getEntry(i, j) > max1) {
                    max1 = this.getEntry(i, j);
                    index1 = walker;
                }
                
                ++walker;
            }
        }
        return index1;
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
            container = container.sigmoidPrimeMatrix()
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
            if (this.feedforward(new Matrix(data[i])).maxIndex() == data[i].label) {
                ++correct;
                console.log("Case " + i + " passed\n");
            } else {
                console.log("Case " + i + " failed\n");
                console.log("Max index = " + this.feedforward(new Matrix(data[i])).maxIndex() + "\n");
                console.log("Label = " + data[i].label + "\n");
            }
        }
        return correct / total;
    }

    train(data, rate, epoch) {
        var size = data.length;
        for (var i = 0; i < epoch; ++i) {
            //var cost = 0;
            for (var j = 0; j < size; ++j) {
                let expect = new Matrix((this.layers)[this.layers.length - 1], 1, false);
                expect.setEntry(data[j].label, 0, 1);
                var wb = this.backPropagate(new Matrix(data[j]), expect);
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
                        let expect = new Matrix((this.layers)[this.layers.length - 1], 1, false);
                        expect.setEntry(data[i * batchSize + j].label, 0, 1);
                
						wb = wb.add(this.backPropagate(new Matrix(data[i * batchSize + j]), expect));
						c += this.cost(new Matrix(data[i * batchSize + j]), expect);
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
                        let expect = new Matrix((this.layers)[this.layers.length - 1], 1, false);
                        expect.setEntry(data[i * batchSize + j].label, 0, 1);
                
						wb = wb.add(this.backPropagate(new Matrix(data[i * batchSize + j]), expect));
						c += this.cost(new Matrix(data[i * batchSize + j]), expect);
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
					let expect = new Matrix((this.layers)[this.layers.length - 1], 1, false);
                    expect.setEntry(data[(batchNum - 1) * batchSize + p].label, 0, 1);
                
					
					wb = wb.add(this.backPropagate(new Matrix(data[(batchNum - 1) * batchSize + p]), expect));
					c += this.cost(new Matrix(data[(batchNum - 1) * batchSize + p]), expect);
					
					
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
                        let expect = new Matrix((this.layers)[this.layers.length - 1], 1, false);
                        expect.setEntry(data[i * batchSize + j].label, 0, 1);
                
						wb = wb.add(this.backPropagate(new Matrix(data[i * batchSize + j]), expect));
						c += this.cost(new Matrix(data[i * batchSize + j]), expect);
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
                        let expect = new Matrix((this.layers)[this.layers.length - 1], 1, false);
                        expect.setEntry(data[i * batchSize + j].label, 0, 1);
                
						wb = wb.add(this.backPropagate(new Matrix(data[i * batchSize + j]), expect));
						c += this.cost(new Matrix(data[i * batchSize + j]), expect);
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
					let expect = new Matrix((this.layers)[this.layers.length - 1], 1, false);
                    expect.setEntry(data[(batchNum - 1) * batchSize + p].label, 0, 1);
                
					
					wb = wb.add(this.backPropagate(new Matrix(data[(batchNum - 1) * batchSize + p]), expect));
					c += this.cost(new Matrix(data[(batchNum - 1) * batchSize + p]), expect);
					
					
                }
                wb = wb.divide(lastBatchSize);
				this.update(wb, rate);
				
			}
            console.log(`${c / size}\\n`);
            console.log(`Accuracy: ${this.test(testdata)}\\n`);
		}
		console.log("Training completed.");
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

    // Drawing functions specifically for [784, 16, 10]
    showNetwork(drawdata) {
        
        fill(150);
        stroke(0);
        strokeWeight(2);
        for (let i = 0; i < 10; ++i) {
            circle(400, 30 + i * 40, 30);
        }

        fill(0);
        circle(400, 420, 5);
        circle(400, 430, 5);
        circle(400, 440, 5);

        fill(150);
        stroke(0);
        strokeWeight(2);
        for (let i = 0; i < 9; ++i) {
            
            circle(400, 470 + i * 40, 30);
        }
        
        for (let i = 0; i < 16; ++i) {
            stroke(this.biases[0].getEntry(i, 0) * 2550);
            circle(740, 70 + i * 45, 30);
        }

        for (let i = 0; i < 10; ++i) {
            stroke(this.biases[1].getEntry(i, 0) * 2550);
            circle(1080, 90 + i * 70, 30);
        }

        strokeWeight(2);
        for (let i = 0; i < drawdata.first.length; ++i) {
            for (let j = 0; j < drawdata.secondF.length; ++j) {
                if (i >= 0 && i < 10) {
                    if (this.weights[0].getEntry(j, i) >= 0) {
                        stroke(this.weights[0].getEntry(j, i) * 25500, 0, 0);
                        line(drawdata.first[i][0], drawdata.first[i][1], drawdata.secondF[j][0], drawdata.secondF[j][1]);
            
                    } else {
                        stroke(0, 0, this.weights[0].getEntry(j, i) * 25500);
                        line(drawdata.first[i][0], drawdata.first[i][1], drawdata.secondF[j][0], drawdata.secondF[j][1]);
            
                    }
                    
                } else {
                    if (this.weights[0].getEntry(j, this.layers[0] - (drawdata.first.length - i)) >= 0) {
                        stroke(this.weights[0].getEntry(j, this.layers[0] - (drawdata.first.length - i)) * 25500, 0, 0);
                        line(drawdata.first[i][0], drawdata.first[i][1], drawdata.secondF[j][0], drawdata.secondF[j][1]);
            
                    } else {
                        stroke(0, 0, this.weights[0].getEntry(j, this.layers[0] - (drawdata.first.length - i)) * 25500);
                        line(drawdata.first[i][0], drawdata.first[i][1], drawdata.secondF[j][0], drawdata.secondF[j][1]);
            
                    }
                }
                //stroke(Math.random() * 255, 0, 0);
                //line(drawdata.first[i][0], drawdata.first[i][1], drawdata.secondF[j][0], drawdata.secondF[j][1]);
            }
        }
        for (let i = 0; i < drawdata.secondB.length; ++i) {
            for (let j = 0; j < drawdata.third.length; ++j) {
                if (this.weights[1].getEntry(j, i) >= 0) {
                    stroke(this.weights[1].getEntry(j, i) * 255000, 0, 0);
                } else {
                    stroke(0, 0, this.weights[1].getEntry(j, i) * 255000);
                }
                line(drawdata.secondB[i][0], drawdata.secondB[i][1], drawdata.third[j][0], drawdata.third[j][1]);
            }
        }

        

    }

    showOutput(input) {
        var expect = this.feedforward(input);
        for (let i = 0; i < 10; ++i) {
            stroke(this.biases[1].getEntry(i, 0) * 2550);
            fill(expect.getEntry(i, 0) * 2550);
            circle(1130, 90 + i * 70, 30);
        }
        return expect.maxIndex();
    }
}


