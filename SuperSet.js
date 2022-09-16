Set.prototype.isSuperset = function(subset) {
    for (var elem of subset) {
        if (!this.has(elem)) {
            return false;
        }
    }
    return true;
}

Set.prototype.union = function(setB) {
    for (var elem of setB) {
        this.add(elem);
    }
    return this;
}

Set.prototype.intersection = function(setB) {
    for (var elem of setB) {
        if (this.has(elem)) {
            this.add(elem);
        }
    }
    return this;
}

Set.prototype.difference = function(setB) {
    for (var elem of setB) {
        this.delete(elem);
    }
    return this;
}


Set.prototype.have = function(elem1) {
    for (var elem of this) {
        if(elem1 == elem) {
            return true;
        } 
    };
    return false;
}

Set.prototype.isSubset = function(superset) {
    for (var elem of this) {
        if (!superset.has(elem)) {
            return false;
        }
    }
    return true;
}