/**
* k means algorithm
* @param data
* @param k
* @return {Object}
*/
var centroids = [], keys = [];

function kmeans(data, k) {

    var dim = Object.keys(data[0]).length
    keys = d3.keys(data[0]);

    var indexArr = new Array(data.length);

	// calculate random values
   for (var i = 0; i < k; i++) {
       centroids.push(getRandomCentroid(dim, data));      
   };



	console.log(centroids)
   // console.log(centroids2)

    var centroidData = [];

    var threshold = 0.1;
    var minError = 0;
	var newQualityChecker = 10000;
	var counter = 0;

   do{

        centroidData = [];

        for (var i = 0; i < k; i++)
            centroidData.push([]);
		
		//Which dot that represents which centroid
        for (var i = 0; i < data.length; i++) {
            indexArr[i] = calculateCentroidDistances(data[i]);
            centroidData[indexArr[i]].push(data[i]);
            // centroidData[indexArr[i]] = (data[i]);
        };
		
		//Make the new centroids
        centroids = [];
        for (var i = 0; i < k; i++) {
            centroids[i] = calculateNewCentroid(centroidData[i]);
		};
		
		//Calculate the quality value and look the diffrence beetween prev and current
		var prevQuality = newQualityChecker;
        newQualityChecker = qualityChecker(centroidData);			
		minError = newQualityChecker/prevQuality;
		
        counter++;

    }while(minError > threshold)

	// console.log("Iterations: " + counter);
	// console.log(indexArr)
	return indexArr;
}


function calculateNewCentroid(centroidData){
    var a = 0, b = 0, c=0, d=0, e=0;

    for (var i = 0; i < centroidData.length; i++) {
        a =+ centroidData[i].A;
        b =+ centroidData[i].B;
        c =+centroidData[i].C;
        d =+centroidData[i].D;
        f =+centroidData[i].E;
    };

    a = a/centroidData.length;
    b = b/centroidData.length;
    c = c/centroidData.length;
    d = d/centroidData.length;
    e = e/centroidData.length;

    return [a, b, c, d, e];
}



function calculateCentroidDistances(p){
    var distances = [];
    for (var i = 0; i < centroids.length; i++) {
    	// console.log(p);
    	// keys.forEach(function(keys, p){
    	// 	console.log(p.keys);

    	// 	// distances.push(Math.sqrt(Math.pow(p.A - centroids[i][0], 2) +
     //  //        Math.pow(p.B - centroids[i][1], 2) +
     //  //        Math.pow(p.C - centroids[i][2], 2))
     //  //        );
    		
    	// })

         distances.push(Math.sqrt(Math.pow(p.A - centroids[i][0], 2) +
             Math.pow(p.B - centroids[i][1], 2) +
             Math.pow(p.C - centroids[i][2], 2))
             );
         // Math.pow(p.C - centroids[i][2], 2))
         // );
     }; 
     var min = d3.min(distances);
     var index = distances.indexOf(min);

     return index;
}

function qualityChecker(centroidData){

    var sum = 0;
    for(var i = 0; i < centroids.length; i++){
        for (var j = 0; j < centroidData[i].length; j++) {
             sum += (Math.pow(centroidData[i][j].A - centroids[i][0], 2) +
             Math.pow(centroidData[i][j].B - centroids[i][1], 2) +
             Math.pow(centroidData[i][j].C - centroids[i][2], 2))
        }
    }
    return Math.sqrt(sum);
}


function getRandomCentroid(dim, data){
// function getRandomCentroid(dim, data){
    var a = [];
    var obj = data[Math.floor(Math.random() * data.length)];

    for (var i = 0; i < dim; i++) {
        a.push(Number(obj[keys[i]]));
    };
    return a;
}
