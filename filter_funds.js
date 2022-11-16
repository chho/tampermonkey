// ==UserScript==
// @name         fund_hiding
// @namespace    http://objdev.net/
// @version      0.1
// @description  hide the row of the fund that is low value.
// @author       objdev@outlook.com
// @match        http://fund.eastmoney.com/data/fundranking.html
// @match        http://fund.eastmoney.com/data/fundranking.html#tall;c0;r;szzf;pn10000;ddesc;qsd20211108;qed20221108;qdii;zq;gg;gzbd;gzfs;bbzt;sfbb
// @icon         https://www.google.com/s2/favicons?sz=64&domain=thewebdev.info
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    window.onload = function () {
        const key_columns = [10, 11, 12];

        const filter_fund = () => {
            let row_index = 0;
            let cell_index = 0;

            const fund_table = document.getElementById('dbtable');

            for (const row of fund_table.rows) {
                // skip the table head.
                if (row_index === 0) {
                    row_index++;

                    continue;
                }

                for (const cell of row.cells) {
                    // check the specific columns whether the value is nagative.
                    if (key_columns.includes(cell_index)) {
                        let value = cell.innerText;

                        // whether the value is null.
                        if (value.charAt(0) === '-') {
                            if (value.charAt(1) !== '-') {
                                // console.log(cell.innerText);
                                // console.log(cell_index);
                                row.style.display = 'none';

                                break;
                            }
                        }
                    }

                    cell_index++;
                }

                row_index++;
                cell_index = 0;
            }
        };

        // add a filter button to the top of fund list.
        const btn = document.createElement('li');
        btn.innerHTML = 'Filter Funds';
        btn.addEventListener('click', filter_fund);

        document.getElementById('types').append(btn);
    };
})();
