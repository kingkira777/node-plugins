import * as brain from  'brain.js'

const config = {
    hiddenLayers: [4],
    learningRate: 0.6
}

const TestData = () => {
    const net = new brain.recurrent.LSTM(config);
    net.train([
        { input: 'I feel great about the world!', output: 'happy' },
        { input: 'The world is a terrible place!', output: 'sad' },
    ]);
    
    //   const output = net.run('I feel great about the world!');

    //net.train(['I am brainjs, Hello World!']);

    const output = net.run('I feel great about the world!');


    console.log(output);
};

export default TestData;