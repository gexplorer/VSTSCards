export default {
    name: 'app',
    data() {
        return {
            config: false,
            idIndex: null,
            typeIndex: null,
            titleIndex: null,
            effortIndex: null,
            zoom: true,
            rows: [],
            columns: [],
            cards: []
        }
    },
    methods: {
        print() {
            this.closeConfig();
            window.print();
        },
        openConfig() {
            this.config = true;
        },
        closeConfig() {
            this.config = false;
            this.refresh();
        },
        refresh() {
            this.cards = [];
            this.$nextTick()
                .then(() => {
                    this.cards = this.rows
                        .map(row => {
                            return {
                                id: row[this.idIndex],
                                isBug: row[this.typeIndex] === 'Bug',
                                title: row[this.titleIndex],
                                effort: row[this.effortIndex],
                                hidden: false
                            }
                        });
                })
                .then(() => {
                    if (this.zoom) {
                        this.$refs.title.forEach(title => {
                            var parentHeight = Math.floor(title.parentElement.clientHeight * 0.85);
                            var parentWidth = Math.floor(title.parentElement.clientWidth);

                            var step = 2;
                            for (var font = 50; font > 10; font -= step) {
                                title.style.fontSize = font + "px";
                                
                                var height = title.offsetHeight;
                                var width = title.offsetWidth;
                                if (height < parentHeight && width <= parentWidth) {
                                    title.style.fontSize = (--font) + "px";
                                    return;
                                }
                            }
                        });
                    }
                });
        },
        toggleCard(card) {
            card.hidden = !card.hidden;
        }
    },
    mounted() {
        var bg = chrome.extension.getBackgroundPage();
        this.columns = bg.table.columns;
        this.rows = bg.table.rows;

        this.columns.forEach(column => {
            switch (column.name.toLowerCase()) {
                case "id":
                    this.idIndex = column.index;
                    break;
                case "work item type":
                    this.typeIndex = column.index;
                    break;
                case "title":
                    this.titleIndex = column.index;
                    break;
                case "effort":
                    this.effortIndex = column.index;
                    break;
            }
        })

        if (this.idIndex !== null && this.typeIndex !== null && this.titleIndex !== null && this.effortIndex !== null) {
            this.refresh();
        } else {
            this.openConfig();
        }
    }
}