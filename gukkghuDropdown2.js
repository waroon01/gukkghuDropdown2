/*!
 * Dropdown list by WaroonRat Thailand v2.0.0: credit 
 * (c) 2022 gukkghu Mr Waroonporn Rattanbutchai
 * letast update V 01.001 16/11/2022 Thank You! 
 * 
 */


class GukkghuDropDownByWaroonRat {

    constructor(data){this.data = data; this.targets = []
    }

    filterData(filtersAsArray){
        return this.data.filter(r=> filtersAsArray.every((item,i) => item === r[i]));
    }

    getUniqueValues(dataAsArray,index){

        const uOption = new Set();
        dataAsArray.forEach(r => uOption.add(r[index])) 
        return [...uOption]
    }

    populateDropDown(el,listArray,textShow){
        el.innerHTML = "";
        listArray.unshift(textShow)
        listArray.forEach(item => {
            const option = document.createElement("option");
            option.textContent = item;
            el.appendChild(option)
        });
    }

    createPopulateDropDownFunction(el,elsDependsOn,textShow){
        return ()=>{
            const elsDependsOnValues = elsDependsOn.length === 0 ? null : elsDependsOn.map(depEl => depEl.value);
            const dataTouse = elsDependsOn.length === 0 ? this.data : this.filterData(elsDependsOnValues);
            const listTouse = this.getUniqueValues(dataTouse,elsDependsOn.length);
            this.populateDropDown(el,listTouse,textShow)
        }
    }


    add(options,textShow){
        // {target: "level1", dependsOn: []}
        console.log(textShow)
        const el = options.target;
        const elsDependsOn = options.dependsOn.length === 0 ? [] : options.dependsOn;
        const eventFunction = this.createPopulateDropDownFunction(el,elsDependsOn,textShow);
        const targetObject = {el: el, elsDependsOn: elsDependsOn,func: eventFunction};
        targetObject.elsDependsOn.forEach(depEl => depEl.addEventListener("change",eventFunction))
        this.targets.push(targetObject)    
        return this;
    }

    initialize(){
        this.targets.forEach(t => t.func());
        return this;
    }

    gukkghuSend(arrOfElements,textShow){
        arrOfElements.forEach((item,i) => {
            const option = {target: item, dependsOn: arrOfElements.slice(0,i) };
            this.add(option,textShow);
        });
        this.initialize();
        return this;

    }

    gukkghuSendByIds(arrayOfIds,textShow){
        this.gukkghuSend(arrayOfIds.map(id => document.getElementById(id)),textShow);
    }


}
