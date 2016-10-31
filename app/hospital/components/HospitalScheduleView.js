import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import TextBox from '../../base/components/TextBox';
import Docking from '../../base/components/Docking';
import Window from '../../base/components/Window';
import Label from '../../base/components/Label';
import DateRange from '../../base/components/DateRange';
import HospitalDockingGrid from './HospitalDockingGrid';

export default class HospitalScheduleView {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    var url = "";

    var searchTextBox = new TextBox({placeHolder: 'Stambuk atau Nama', width: 250, height: 24});
    var searchButton = new Button({
      imgSrc:'/ceu_assets/images/search.png',
      theme: 'metro',
      width: 30,
      height: 27,
      onClick: function(){

        for(var i=0; i<_this.dockingGrids.length; i++){
            _this.dockingGrids[i].reloadByDateRange(dateRange.getValue());
        }

      }
    });

    var dateRange = new DateRange({});

    var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 40px;"></td>');
    table.appendTo(container);
    tr.appendTo(table);
    td.appendTo(tr);

    var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
    var innerTr = $('<tr></tr>');
    var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; padding-right: 8px; width: 200px; height: 100%;"></td>');
    innerTable.appendTo(td);
    innerTr.appendTo(innerTable);
    innerTd.appendTo(innerTr);
    dateRange.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%; "></td>');
    var _tempContainer = $('<div style="margin-left: -5px;"></div>')
    _tempContainer.appendTo(innerTd);
    innerTd.appendTo(innerTr);
    searchButton.render(_tempContainer);

    tr = $('<tr></tr>');
    td = $('<td style="padding: 0;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);

    var loadHospitals = function(){
      var url = "/hospitals/hospitals_all";
      $.ajax({
        method: "GET",
        url: url,
        data: {}
      }).done(function(data) {
          renderHospitalList(data);
      }).fail(function() {
        var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
        $("#errorNotification").html('<div>' + errorMessage + '</div>');
        $("#errorNotification").jqxNotification("open");
      });
    }

    var renderHospitalList = function(hospitals){

      var dockingItems = [];
      var dockingGrids = [];
      for(var i=0; i<hospitals.length; i++){
        var hospitalDockingGrid = new HospitalDockingGrid(hospitals[i].id, hospitals[i].tipe, dateRange.getValue());
        var color = '#4A90E2';
        if(hospitals[i].tipe == 1){
          color = '#4A90E2';
        }else if(hospitals[i].tipe == 2){
          color = '#BB8FCE';
        }
        dockingItems.push(
          {
            title: hospitals[i].nama,
            color: color,
            content: hospitalDockingGrid
          }
        );
        dockingGrids.push(hospitalDockingGrid);
      }

      var docking = new Docking({
        items: dockingItems,
        itemsCountPerColumn: 6
      });

      _this.dockingGrids = dockingGrids;
      docking.render(td);
    }

    loadHospitals();

  }
}
