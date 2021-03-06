import {asciiTableBig} from './AsciiTableBig';
import { AnyObject } from '../typeing/common';

export const asciiTable = (json: AnyObject[], appendLine: (line: string) => void): void => {
    const MAX_CHARACTERS_IN_LINE = 180;
    const keys = Object.keys(json[0]);
    const width: AnyObject = {};

    const line = function(){
        var line = ' +';
        for (let size in width) {
            line +=  ( '-'.repeat(width[size]+2) ) + '+';
        }

        return line;
    };

    const draw = () => {
        appendLine(line());
        let buffer = ' | ';
        for (let key in keys) {
            buffer += keys[key] + ( ' '.repeat(width[keys[key]] - String(keys[key]).length) ) + ' | ';
        }
            
        appendLine(buffer); 
        appendLine(line()); 
        
        for (let row in json) {
            let buffer = ' | ';
            for (let data in json[row]) {
                buffer += String(json[row][data]) + ( ' '.repeat(width[data] - String(json[row][data]).length) ) + ' | ';
            }
            appendLine(buffer); 
        }
        
        appendLine(line());
    };

    for (var key in keys) {
        width[keys[key]] = String(keys[key]).length;
    }

    for (var row in json) {
        for (var data in json[row]) {
            width[data] = Math.max(width[data], String(json[row][data]).length);
        }
    }

    var counterWidth = 0;
    for (var size in width) {
        counterWidth +=  width[size];
    }

    if(counterWidth > MAX_CHARACTERS_IN_LINE){
        return asciiTableBig(json, appendLine);
    }

    draw();
};
