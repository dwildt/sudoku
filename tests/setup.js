global.localStorage = {
    store: {},
    getItem: function(key) {
        return this.store[key] || null;
    },
    setItem: function(key, value) {
        this.store[key] = String(value);
    },
    removeItem: function(key) {
        delete this.store[key];
    },
    clear: function() {
        this.store = {};
    }
};

global.alert = jest.fn();

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            'title': 'Sudoku',
            'newGame': 'New Game'
        })
    })
);
