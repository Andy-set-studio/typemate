/*------------------------------------*\
    TYPEMATE

    Run text filters across DOM elements
    to help achieve nice typesetting
    on dynamic content.
\*------------------------------------*/
class TypeMate {

    constructor(parent, settings = {}) {
        let self = this;

        // Set some settings, by merging defaults and passed settings
        self.settings = {...{
            minWords: 4,
            selector: 'p',
            ignoreClass: 'js-typemate__ignore'
        }, ...settings};

        // Either load from root or the passed parent element
        if(typeof(parent) === 'undefined') {
            self.elems = [...document.querySelectorAll(self.settings.selector)];
        }
        else {
            self.elems = [...parent.querySelectorAll(self.settings.selector)];
        }
    }
    
    /**
     * Apply formatting to the loaded elements
     * @return void
     */
    apply() {
        let self = this;

        self.elems.map(elem => {

            // Bail out if the ignore class is present on this element  
            if(elem.classList.contains(self.settings.ignoreClass)) { 
                return false;
            }

            // The result string will be tacked on to this 
            var result = '';

            // Split words/tags into array
            let textItems = elem.innerHTML.trim().replace(/&nbsp;/g, '').split(/ (?=[^>]*(?:<|$))/);

            // Check if the text warrants this module
            if(textItems.length < self.settings.minWords) {
                return;
            }
            
            // Run widows filter 
            textItems = self.preventWidows(textItems);

            // Join the words back together
            result = textItems.join(' ');

            // Replace whitespace after no break spaces
            result = result.replace(/&nbsp; /g, '&nbsp;');
            
            // Set the content of the element with our shiny string
            elem.innerHTML = result;
        });
    }
    
    /**
     * Apply the widows filter to the passed text and return it
     * @param {string} textItems 
     */
    preventWidows(textItems) {

        // Find the second to last work
        var targetWord = textItems[(textItems.length - 2)];

        // Stick a no break space to the end of the word and replace the instance in the array
        textItems[(textItems.length - 2)] = targetWord + '&nbsp;';
        
        return textItems;
    }
    
    /**
     * Reset any formatting 
     * @return void
     */
    reset() {
        let self = this;
        
        self.elems.map(elem => {
            elem.innerHTML = elem.innerHTML.replace(/&nbsp;/g, ' ');
        });
    }
}

export default function(parent, settings = {}) {
    return new TypeMate(parent, settings);
};