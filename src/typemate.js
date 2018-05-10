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
        self.settings = Object.assign({
            minWords: 4,
            selector: 'p',
            ignoreClass: 'js-typemate__ignore',
            ignoreExistingSpaceChars: false 
        }, settings);

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

            // Run the ignore checker nd bail if required
            if(self.shouldElementBeIgnored(elem)) {
                return false;
            }

            // The result string will be tacked on to this 
            var result = '';

            // Split words/tags into array
            let textItems = elem.innerHTML.trim().replace(/&nbsp;/g, ' ').split(/ (?=[^>]*(?:<|$))/);

            // Check if the text warrants this module
            if(textItems.length < self.settings.minWords) {
                return;
            }
            
            // Run orphans filter 
            textItems = self.preventOrphans(textItems);

            // Join the words back together
            result = textItems.join(' ');

            // Replace whitespace after no break spaces
            result = result.replace(/&nbsp; /g, '&nbsp;');
            
            // Set the content of the element with our shiny string
            elem.innerHTML = result;
        });
    }
    
    /**
     * Apply the orphans filter to the passed text and return it
     * @param {string} textItems 
     */
    preventOrphans(textItems) {

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
            
            // Run the ignore checker nd bail if required
            if(self.shouldElementBeIgnored(elem)) {
                return false;
            }

            elem.innerHTML = elem.innerHTML.replace(/&nbsp;/g, ' ');
        });
    }

    /**
     * Run checks to see if the passed element should be skipped
     * 
     * @param {HTMLElement} elem 
     * @returns boolean
     */
    shouldElementBeIgnored(elem) {
        let self = this;

        // Check if the element already contains 1 or more &nbsp; characters and the 
        // ignore setting is true. If so: bail.
        if((elem.innerHTML.indexOf('&nbsp;') > -1) && self.settings.ignoreExistingSpaceChars) {
            return true; 
        }

        return false;
    }
};

module.exports = function(parent, settings = {}) {
    return new TypeMate(parent, settings);
};