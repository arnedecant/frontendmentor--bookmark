'use strict'

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

String.prototype.capitalize = function() {
    return capitalize(this)
}