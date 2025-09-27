let array = [];

// Generate new array
function generateArray(size = 12) {
    array = [];
    const container = document.getElementById('array-container');
    container.innerHTML = '';

    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 200) + 20;
        array.push(value);

        let bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value}px`;
        bar.style.width = `${Math.floor(600 / size) - 4}px`;
        bar.innerText = value;
        container.appendChild(bar);
    }
}

// Bubble Sort
async function bubbleSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'yellow';
            bars[j + 1].style.backgroundColor = 'yellow';
            await new Promise(resolve => setTimeout(resolve, 200));

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
                bars[j].innerText = array[j];
                bars[j + 1].innerText = array[j + 1];
            }

            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
        }
        bars[array.length - i - 1].style.backgroundColor = 'green';
    }
    bars[0].style.backgroundColor = 'green';
}

// Selection Sort
async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = 'yellow';

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'orange';
            await new Promise(resolve => setTimeout(resolve, 200));

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) bars[minIndex].style.backgroundColor = 'red';
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'yellow';
            } else {
                bars[j].style.backgroundColor = 'red';
            }
        }

        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = `${array[i]}px`;
            bars[minIndex].style.height = `${array[minIndex]}px`;
            bars[i].innerText = array[i];
            bars[minIndex].innerText = array[minIndex];
        }
        bars[i].style.backgroundColor = 'green';
    }
}

// Insertion Sort
async function insertionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'yellow';
        await new Promise(resolve => setTimeout(resolve, 200));

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;
            bars[j + 1].innerText = array[j + 1];
            bars[j + 1].style.backgroundColor = 'orange';
            j--;
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[j + 1].innerText = key;

        for (let k = 0; k < bars.length; k++) {
            if (bars[k].style.backgroundColor !== 'green')
                bars[k].style.backgroundColor = 'red';
        }
    }
    for (let i = 0; i < bars.length; i++) bars[i].style.backgroundColor = 'green';
}

// Run selected sorting algorithm
function sortArray() {
    const algo = document.getElementById('algorithm').value;
    if (algo === 'bubble') bubbleSort();
    else if (algo === 'selection') selectionSort();
    else if (algo === 'insertion') insertionSort();
}

// Automatically generate new array and sort when algorithm changes
document.getElementById('algorithm').addEventListener('change', () => {
    generateArray();
    sortArray();
});

// Generate initial array on page load
generateArray();
