document.addEventListener('DOMContentLoaded', function() {
    const terminalBody = document.getElementById('terminalBody');
    const defaultMessage = 'AS-WOS [Version 6.44.52.37] (c) Aurorasoft. All Rights Reserved.';
    
    const defaultOutput = document.createElement('div');
    defaultOutput.textContent = defaultMessage;
    terminalBody.appendChild(defaultOutput);
});

window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        window.location.href = './safemode.html';
    }
});

const userInput = document.getElementById('userInput');
const commandHistory = [];
let historyIndex = -1;
let isSelectingText = false;

document.addEventListener('mousedown', function() {
    isSelectingText = false;
});

document.addEventListener('mousemove', function() {
    isSelectingText = true;
});

document.addEventListener('mouseup', function() {
    if (!isSelectingText) {
        userInput.focus();
    }
});

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const command = userInput.value.trim().toLowerCase();
        if (command !== '') {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            executeCommand(command);
        }
        userInput.value = '';
    } else if (event.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            userInput.value = commandHistory[historyIndex];
        }
    } else if (event.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            userInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            userInput.value = '';
        }
    }
});

function executeCommand(command) {
    const terminalBody = document.getElementById('terminalBody');

    const commandDiv = document.createElement('div');
    commandDiv.textContent = `A: ${command}`;
    terminalBody.appendChild(commandDiv);

    const output = document.createElement('div');
    terminalBody.appendChild(output);

    const line = document.createElement('hr');
    terminalBody.appendChild(line);

    const parts = command.split(' ');
    const cmd = parts[0];

    if (cmd === 'hello' && parts[1] === 'world') {
        parts.splice(0, 2, 'hello_world');
    }

    if (cmd === 'short' && parts[1] === 'define') {
        parts.splice(0, 2, 'short_define');
    }

    if (cmd === 'weather' && parts[1] === 'in') {
        parts.splice(0, 2, 'weather_find');
    }

    if (cmd === 'fork' && parts[1] === 'bomb') {
        parts.splice(0, 2, 'forkbomb');
    }


    switch (parts[0]) {
        case 'about':
            output.innerHTML = `AS-WOS Version 6.44 <br> (C)Copyright Aurorasoft 2021-2024`;
        break;
    
        case 'askey':
            output.textContent = 'AS-WOS is distributed by Aurorasoft. The current key is b6842ded-ef40-44e8-9efd-47260604dc97';
        break;
    
        case 'basic':
            output.innerHTML = `AS-WOS is a text-based web desktop. Type 'command' for a list of possible commands.`;
        break;
    
        case 'break':
            output.innerHTML = `<br>`;
        break;

        case 'checksystem':
            output.innerHTML = `AS-WOS is: FUNCTIONAL.`;
        break;
    
        case 'command':
            output.innerHTML = 'Available commands: <br> about <br> askey <br> basic <br> break <br> command <br> copyright <br> date <br> define <br> dir <br> echo <br> exit <br> find <br> goto <br> hello_world <br> help <br> print <br> mailto <br> repo <br> time <br> verify <br> version <br> weather <br> whois';
        break;
    
        case 'copyright':
            output.innerHTML = 'AS-WOS is distributed by Aurorasoft. Copyright (c) 2024 Aurorasoft.';
        break;
    
        case 'date':
            const date = new Date();
            output.textContent = `Current date is ${date}`;
        break;
    
        case 'define':
            if (parts.length < 2) {
                output.textContent = 'WARN: This command is for a full definition. Usage: define <word>';
            } else {
                const word = parts[1];
                const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Word not found');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const definitions = data[0].meanings.map(meaning => {
                            const partOfSpeech = meaning.partOfSpeech;
                            const definitions = meaning.definitions.map(def => {
                                return `Definition: ${def.definition}\n Example: ${def.example || 'N/A'}\n Synonyms: ${def.synonyms.join(', ') || 'N/A'}`;
                            }).join('\n');
                            return `Part of Speech: ${partOfSpeech}\n${definitions}`;
                        }).join('\n\n');
                        output.textContent = `Definitions for '${word}':\n${definitions}`;
                    })
                    .catch(error => {
                        output.textContent = `Error: ${error.message}`;
                    });
            }
        break;
    
        case 'dir':
            output.innerHTML = `D`;
        break;
    
        case 'echo':
            const echoMessage = parts.slice(1).join(' ');
            output.textContent = echoMessage;
        break;
    
        case 'exit':
            window.location.href = 'https://google.com';
        break;
    
        case 'find':
            if (parts.length < 2) {
                output.textContent = 'Usage: find <query>';
            } else {
                const query = parts.slice(1).join(' ');
                const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query) + '&udm=14';
                window.location.href = searchUrl;
            }
        break;

        case 'forkbomb':
            output.innerHTML = `EZSXZyb5JizoZXXPiEzBZrmcfheYqJmg\nOfjJQUXuoQEOO5OEUKfo0Qp4xaEQ1wSW\nxM0PTdQYSvUumF7CJI1Jig5v52IN499l\nAsmvV5ByxyhEOgYDTROFZHQHzwAUA1Gx\nwCzOSXYvfdGhOuBSgcuuXhwCrIJXwciv\nNka61TdmxjrwCUFnggx45G5eGIPW6oDw\nr5On9mFmuURyZI6HXR5E8XbmHaxJ9ZIm\naBFf3FwJ4T7oRGY3zyxDIxjP3IyoEHrq\nndSJaE8wqgPeTwRz2sXbk2vR80aQ1Vwe\nbnRgQcnkinCT5qQ65ELTnJzR0vJHc87x\nuqfvSAJPl1lppOmQOwZyOBHSiT8PIdfX\niq7uGc8Wck0cG8CKBHVShl34Zm1vqQhe\n0nirJXTTy80H36hpAIo2UOE9yswbQSls\nENYAVn83AnBcRVrNMYI0ebsFc7f4I2Tm\nGsewDHIzwV2Rooljk413yhWWpc3gqy5G\ngVpicTbG6sLzYPljw4owuzsu8iLKv0f9\nL2fLQOJi2hL9qghTMbbXWcb8gPDUd4tQ\n5nGbkZzm48AzLAfgisefAV6wclkBDh3Q\n7nZW6qW0NX6stUvlGmdayTsPSTvGsAeH\niEbgFvFRgrgDHHALk6pyKmpWYKseS6Ao\nz4WQM8OwoeJe16INcMvAU6PHvWumyK0S\nXiGBEzzHHnuvZkLdEmZpfQIQmJ7sUY5g\nyKV4ERGI3eLMoTPbLFAdfpqFYzvwFq4v\nt8pvbSBFkIC16OhWBFwiBK30zxZIItUl\nTS5ieAgLszbVcBryifLMG489xSUTqzPq\nvlg77gnMCc26P5XOPbxJGNhZKgyAww20\n3Ms07qFEdYgYtEfqzSXejw46kPf7kVE8\nRVWQm32HIwXgc25elP1Z1IByFhj0krZg\n9fOprWvjWZ0kn2Db1fcTFLEP2MjIypHL\njwhGl8xML33N2GrO9xIBLMYQns2nc59B\nciN83lNNvwfz3ZpPdUmwPZ91Lioxj8ZO\nTC8csbwR4mJO4iwgIutCk2FuG7I4E2Ra\nWP8SsZUVYdiuWEj7Iwme9eUVAg5lNE3C\nxZ9WtPh592MjRxK5EHgp4xaUqgOAEX7s\nMFGxHTYQysBijDn0Eu5qeP2HDSNMsbfD\nt3zC4GtR2nZfePZEQb0wIfYJIjcGovmv\npYydzS1SUt3z9xk5yA9T1yC0WPye6opg\nraqJz3ExRfl34BFrU9WXHCdBpQ5BOJpt\nSTQEuSoZMCu9ycuNwz3N0shqyH5euAuz\nGchMrX5gUipN5Vvzd3QpZWCEb85BxHxW\nxxW0D7Uy1VLaHY0ikBYbBDam8RLYfvax\nHTAzCeVJPUZ1XIraVlbN2LERq5Hm7Uyx\ntioSqDEPjM0T5l6VAXRYVerQJUTfy2fP\nILEpzPThQvaXZfOZbwnDt8pXllkmnUEu\n2HAYiKmiYyPWwJFEkeFuTInLoOrHcrmZ\nFHazWMQYhtdNVgtXiFk1E6jdiZrojldJ\nnAVYkj2ipe1WA1gqKQrDG96YVUItDEla\nW8S4Hf9uO0IriHrKb10LxdsZR6obsvG7\nObLMC3ydQIo38b5sgyxzCtmZT3VNydqX\ntgiq7wMreCwFYwOw7pqKk2y0z8CaAMWl\nqeWkeG6SyiqFqEk6n0Rf6KjyIoWnjTJT\nU3u8GWOahsoZDUkMMmW7PuMV68NMpO0h\n7alFN0LrEHqhzsoiJkbodTlon1WlyXmn\ncnUv8br1Bth0y4mE1325VJxm7RigY8pO\nv5Y0Lem5Zx79kQcjyQrdGG7brdbfGRLT\n0SJ1D8ZlBFRoXxc7RppsQHDX11qLhuMK\nbZppsqBN2qodRSI5h9kuRjHaXGh8i7Jp\najDthRLuobSWpNVkltiZD42tH4AP7QLh\nDtIKReQYheondcHvOLtQTRMuq1vV27mU\n1IsIFMqAYd8ooQxgp3UNZchUUUfZB97G\n5SI5yn5cQcVIiXHbh3JmSyscNy86vPsb\nYJ1xzV6GprBsoLlmNfPiITeTnmQLvDQ5\nZqp7ZzdezaROOsnumLV7AZGHxryVfEW0\nn5mninpod3pMUCbBrPUSP8Iiup9nltWi\nKd3DNEkryUqZN6PpR4EQfDkmx47AMCvf\nVZoelrXNwHvv1q7k9kbcwY1MUoOio8l9\nhd5sjAPGTcWxYiY5Xxfmh07nPt3PtzoF\ngEA1i8X1mfWjVLHlxo8eERIzz0oE3WVY\nPGC5kQK48dGiLllx7KvAxAOEGIffIgfY\nmE17bnR2emDiTPKFMW8T9TISNmnVHr5i\nC27bj5RJPsYWZ2jUWpEnZdJRq325KbxR\nUiCUiWwJBPxI2UiMfoSsEwHtS0Sf4RyR\n5NnPk7IUFbDOImZnttkHWca7Uu7AhGjp\nRKyLGQfQGvVtKhIhLlPaIMN5talRUk0D\nQMGN87cHtMidadjc63SJrAXGor6FqamG\nddhwjsbpnLze9ExHxk7NH8mE3CbHr7OY\nlUJhRdsfwJ5JNEhEHcJzLT4NfOtXxI9N\nCPKQMXIEDg70y4RFLHkVCVcLy93nRPfn\nKKIT7clBnMrgW0LKeXpOQfVS6sXPn6a9\nOue1IsLB7oToTvLuLNmRNrKp2ms1cTjY\n9zW078kL85eBzy0IV4nUmdXEcPieGOeK\ngM8VE2xdNhsGp7r6fk0pzr8DA5zkMfFE\njRdJZ7Qi57CNVOkZ9LRWB9QbtCHkJaIq\npj8jjvDz2DAg5FG0rc5cFvR4HzRTe6XA\nxo9O9QiAtYtI0Ksf9OJ3oZ7MShXiWmWR\n1YWnhpMqP4czASFsiMKU41rwRucCseih\nlJQXu813Y8gjlpwAWtFHMkAsHx1FlI0t\nw0J4SBeQqBzl3SjqpHR6UhtfDUAjFtAr\nSZZAboeCYQnOaghsl4ZftopiLDaGnqZR\n07hMhBn5ZeDlnkbdBJUIJlzPIRKBPUbE\nCXxc4UzEcSWxDABDDBGsn8F4UqASmCWc\ngcDDgCDi6CEdLKSstlbV1jXF7BNVc3e1\nnGAcRRv6NsdTwngPahvPv2H7H6Qn0QJq\nS8BfGPkiXOwBxokd9raCE4HGwar1d30A\nQxVLAulq4PrawGfdzVMkwCPy3h21b19X\nk4eRr0hzwWew6REAey91N8qHEGaUATo5\nyJZVrEvYcqbG4BOGV9wWJftCuoEpPy35\n0jgZizZJIQ2K2B6pZRfVyjti8Yq8JXyQ\nL43GztixgvJWAWSTM1MRt2XHFbn2mZ1w\nl11o3WRLr5mX3Aemx7g3sC6h2MaWNv51`;
            setTimeout(() => {
                window.location.href = './error.html';
            }, 10000);
            break;
        break;
    
        case 'goto':
            if (parts.length < 2) {
                output.textContent = 'Usage: goto <url>';
            } else {
                let url = parts[1];
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                window.location.href = url;
            }
        break;
    
        case 'hello_world':
            output.innerHTML = 'hello, user!';
        break;
    
        case 'help':
            output.textContent = `Enter 'command' to see a list of available commands.`;
        break;
    
        case 'print':
            if (parts.length < 2) {
                output.textContent = 'Usage: calc <expression>';
            } else {
                const expression = parts.slice(1).join(' ');
                try {
                    const result = math.evaluate(expression);
                    output.textContent = `${expression} = ${result}`;
                } catch (error) {
                    output.textContent = 'Error: Invalid expression';
                }
            }
        break;
    
        case 'mailto':
            if (parts.length < 2) {
                output.textContent = 'Usage: mailto <email_address>';
            } else {
                const emailAddress = parts[1];
                window.location.href = `mailto:${emailAddress}`;
            }
        break;
    
        case 'repo':
            window.location.href = 'https://github.com/BarclaySoftware/BT-WOS';
        break;
    
        case 'time':
            const time = new Date();
            output.textContent = `Current Date and Time: ${time}`;
        break;
    
        case 'verify':
            output.textContent = `AS-WOS is distributed by Aurorasoft. Copyright (c) 2024 Aurorasoft.`;
        break;
    
        case 'version':
            output.textContent = `AS-WOS Version 6.44`;
        break;
    
        case 'weather':
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const apiKey = config.weatherApiKey;
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
                    fetch(apiUrl)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Unable to fetch weather data');
                            }
                            return response.json();
                        })
                        .then(data => {
                            const weatherDescription = data.weather[0].description;
                            const temperatureC = data.main.temp;
                            const temperatureF = (temperatureC * 9 / 5) + 32;
                            const city = data.name;
                            output.textContent = `Current location weather in ${city}: ${weatherDescription}, Temperature: ${temperatureC}Â°C, ${temperatureF}Â°F`;
                        })
                        .catch(error => {
                            output.textContent = `Error: ${error.message}`;
                        });
                }, error => {
                    output.textContent = `Error: ${error.message}`;
                });
            } else {
                output.textContent = 'Geolocation is not supported by this browser.';
            }
        break;
    
        case 'whois':
            const pc = new (window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection)({
                iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
            });
            const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
            
            pc.createDataChannel('');
            pc.createOffer().then(offer => pc.setLocalDescription(offer));
            
            pc.onicecandidate = function(event) {
                if (event.candidate && event.candidate.candidate) {
                    const ipAddress = event.candidate.candidate.match(ipRegex);
                    if (ipAddress) {
                        output.textContent = `Your IP address is: ${ipAddress[0]}`;
                        pc.close();
                    }
                }
            };
        break;
    
        default:
            output.innerHTML = `The entered command is not recognized. Enter 'command' for a list of commands.`
            break;
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
}