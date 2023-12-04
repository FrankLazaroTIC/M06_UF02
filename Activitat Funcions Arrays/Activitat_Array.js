//Exercici 1
function arrayDeColors(){
    let colors = ['verd', 'vermell', 'groc', 'blau', 'negre', 'blanc'];

    // Comprovar si tots els colors són menors que 'marró'
    let totsMenorsQueMarro = colors.every(function(color) {
        return color < 'marró';
    });
    if(!totsMenorsQueMarro){
        document.write("No son menors que marro<br>")
    }else{
        document.write("Son menors que marro<br>");
    }
    

    // Tornar els colors que són menors que 'marró'
    let colorsMenorsQueMarro = colors.filter(function(color) {
        return color < 'marró';
    });
    document.write("Colors menors que marro: "+colorsMenorsQueMarro+"<br>");

    // Tornar els darrers 2 colors
    let ultimsDosColors = colors.slice(-2);
    document.write("Darrers 2 colors: "+ultimsDosColors+"<br>");

    // Afegir el color 'turquesa'
    colors.push('turquesa');
    document.write("Afegim el color turquesa:"+colors+"<br>")

    // Eliminar el color 'verd'
    let indexVerd = colors.indexOf('verd');
    if (indexVerd !== -1) {
        colors.splice(indexVerd, 1);
    }
    document.write("Eliminem el color verd: "+colors+"<br>");

}

//Exercici 2

function testFuncions(){
    let array = [1,2,3,4,5,6];
    let array2= [7,8];
    let arrayRandom = [12,13,0,90,12,3,54,1];
    let arrayStrings=["hola","messi","futbol"];
    let array100=[10,30,50];
    let arrayNoms= ["Rita", "Pedro", "Miguel", "Ana", "Vanesa"];
    let nom="Frank";

    document.write("Array =  "+array+"<br>");

    document.write("Array2 =  "+array2+"<br>");

    document.write("Array2 =  "+arrayRandom+"<br>");

    document.write("Array2 =  "+arrayStrings+"<br>");

    document.write("Array2 =  "+array2+"<br>");

    document.write("Array2 =  "+array100+"<br>");

    document.write("Array2 =  "+arrayNoms+"<br>");

    document.write("Function at(3) : "+array.at(3)+"<br>");

    document.write("Function concat(array2) : "+array.concat(array2)+"<br>");

    document.write("Function copyWithin(1,3) : "+array.copyWithin(1,3)+"<br>");

    let arrayX= array.entries();
    document.write("Function entries() : "+arrayX+"<br>");

    let numMajor0=array.every(function(num){
        return num > 0;
    })
    document.write("Function every() : "+numMajor0+"<br>");

    document.write("Function fill() : "+array.fill("x",5)+"<br>");

    document.write("Function filter() : "+array.filter((num)=>num>4)+"<br>");

    document.write("Function find() : "+array.find((element)=> element='x')+"<br>");

    document.write("Function findIndex() : "+array.findIndex((num)=> num>5)+"<br>");

    document.write("Function flat() : "+array.find((element)=> element='x')+"<br>");

    document.write("Function flatMap() : "+array2.flatMap((num)=> num*2)+"<br>");

    document.write("Function forEach() : "+"<br>");
    array.forEach((num)=>document.write(num+"<br>"))

    document.write("Function from() : "+Array.from("Messi")+"<br>");

    document.write("Function includes() : "+arrayStrings.includes("messi")+"<br>");

    document.write("Function indexOf() : "+arrayStrings.indexOf("messi")+"<br>");

    document.write("Function isArray() : "+Array.isArray(arrayRandom)+"<br>");

    document.write("Function join() : "+arrayStrings.join("-")+"<br>");

    let clau="";
    for(let i of arrayStrings.keys()){
        clau+=i+","
    }
    document.write("Function keys() : "+clau+"<br>");

    document.write("Function lastIndexOf() : "+arrayStrings.lastIndexOf("k")+"<br>"); //No existeix el valor k

    document.write("Function length() : "+array.length+"<br>");

    document.write("Function map() : "+array2.map((num)=> num*10)+"<br>");

    document.write("Function pop() : "+arrayStrings.pop()+"<br>");


    Array.prototype.lMajuscules = function(){
        for (let i = 0; i < this.length; i++) {
            this[i] = this[i].toUpperCase();
            
        }
    };
    arrayNoms.lMajuscules();
    
    document.write("Function prototype():"+arrayNoms+"<br>");

    document.write("Function push() : "+arrayStrings.push("Qatar")+"<br>");

    document.write("Function reduce() : "+array100.reduce((total,num)=> total-num)+"<br>");

    document.write("Function reduceRight() : "+array100.reduceRight((total,num)=> total-num)+"<br>");

    document.write("Function reverse() : "+array.reverse()+"<br>");

    let eliminat=array.shift();
    document.write("Function shift() : "+array100+"<br>Element eliminat: "+eliminat+"<br>");

    document.write("Function slice() : "+arrayNoms.slice(1,3)+"<br>");

    document.write("Function some() : "+array.find((element)=> element='x')+"<br>");

    document.write("Function sort() : "+array100.sort()+"<br>");

    document.write("Function splice() : "+arrayNoms.splice(1,0,"Messi")+"<br> Array despres del splice :"+arrayNoms+" <br>");
    
    let arrayStr=arrayStrings.toString();
    document.write("Function toString() : "+arrayStr+"<br>");

    document.write("Function unshift() : "+array100.unshift(10,10)+"<br> Array despres del unshift: "+array100+"<br>");

    document.write("Function valueOf() : "+array100.valueOf()+"<br>");


}   



