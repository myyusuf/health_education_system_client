import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import ToggleButton from '../../base/components/ToggleButton';
import TextBox from '../../base/components/TextBox';
import ComboBox from "../../base/components/ComboBox";
import GanttChart from '../components/GanttChart';
import LevelComboBox from "../../student/components/LevelComboBox";
import AddScheduleWindow from "../../schedule/components/AddScheduleWindow";
import AddScheduleLevel2Window from "../../schedule/components/AddScheduleLevel2Window";

import EditParentScheduleWindow from "../../schedule/components/EditParentScheduleWindow";
import EditParentScheduleLevel2Window from "../../schedule/components/EditParentScheduleLevel2Window";
import EditDivisionScheduleWindow from "../../schedule/components/EditDivisionScheduleWindow";

export default class ScheduleView {

  constructor(data) {
    this.id = guid();
    this.source = data;
  }

  render(container) {

    var _this = this;

    this.ganttChart = new GanttChart({
      onTaskDblClick: function(id){

        var url = "/schedules/" + id;
        $.ajax({
          method: "GET",
          url: url,
          data: {}
        }).done(function(data) {

          if(data.schedule.tipe_jadwal == 'PR' && data.schedule.tingkat == 1){
            var editParentScheduleWindow = new EditParentScheduleWindow(
              data,
              function(){
                _this.getGanttData();
              }
            );
            editParentScheduleWindow.render($('#dialogWindowContainer'));
            editParentScheduleWindow.open();
          }else if(data.schedule.tipe_jadwal == 'PR' && data.schedule.tingkat == 2){
            var editParentScheduleLevel2Window = new EditParentScheduleLevel2Window(
              data,
              function(){
                _this.getGanttData();
              }
            );
            editParentScheduleLevel2Window.render($('#dialogWindowContainer'));
            editParentScheduleLevel2Window.open();
          }else if(data.schedule.tipe_jadwal == 'BA'){
            var editDivisionScheduleWindow = new EditDivisionScheduleWindow(
              data,
              function(){
                _this.getGanttData();
              }
            );
            editDivisionScheduleWindow.render($('#dialogWindowContainer'));
            editDivisionScheduleWindow.open();
          }

        }).fail(function() {
            alert('Error while doing operation');
        });

      }
    });
    this.ganttChartData = {data:[]};

    var addScheduleButton = new Button({
      title: 'Tambah Jadwal',
      template: 'primary',
      onClick: function(){

        var tingkat = _this.levelCmb.getValue();
        if(tingkat == 1){
          var addScheduleWindow = new AddScheduleWindow();
          addScheduleWindow.render($('#dialogWindowContainer'));
          addScheduleWindow.open();
        }else if(tingkat == 2){
          var addScheduleLevel2Window = new AddScheduleLevel2Window();
          addScheduleLevel2Window.render($('#dialogWindowContainer'));
          addScheduleLevel2Window.open();
        }

      }
    });

    var showWeekButton = new ToggleButton({
      title: 'Show Week',
      onButtonToggled: function(){
        _this.ganttChart.useWeekScale();
      },
      onButtonNotToggled: function(){
        _this.ganttChart.useDayScale();
      }
    });

    //---ComboBox---

    this.levelCmb = new LevelComboBox({
      onChange: function(value){
        _this.getGanttData();
      }
    });
    //---------------

    this.searchTextBox = new TextBox({placeHolder: 'Stambuk atau Nama', width: 250, height: 24});
    var searchButton = new Button({
      onClick: function(){
        _this.getGanttData();
      },
      imgSrc:'/ceu_assets/images/search.png',
      theme: 'metro', width: 30, height: 26
    });

    var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 40px;"></td>');
    table.appendTo(container);
    tr.appendTo(table);
    td.appendTo(tr);

    var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
    var innerTr = $('<tr></tr>');
    var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
    innerTable.appendTo(td);
    innerTr.appendTo(innerTable);
    innerTd.appendTo(innerTr);
    addScheduleButton.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%; width: 100px;"></td>');
    innerTd.appendTo(innerTr);
    showWeekButton.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%; width: 86px;"></td>');
    innerTd.appendTo(innerTr);
    this.levelCmb.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%; width: 250px;"></td>');
    innerTd.appendTo(innerTr);
    this.searchTextBox.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%;"></td>');
    var _tempContainer = $('<div style="margin-left: -5px;"></div>')
    _tempContainer.appendTo(innerTd);
    innerTd.appendTo(innerTr);
    searchButton.render(_tempContainer);

    tr = $('<tr></tr>');
    td = $('<td style="padding: 0;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);

    this.ganttChart.render(td);
  }

  processData(data){

    this.ganttChartData.data = [];

    for(var i = 0; i<data.length; i++){

      if(data[i].tipe_jadwal == 'PR'){
        this.ganttChartData.data.push({
          "id": data[i].id,
          "text": data[i].nama,
          "type": "project",
          "start_date": "",
          "duration": "",
          "progress": data[i].progress,
          "open": false
        });
      }else if(data[i].tipe_jadwal == 'BA'){
        this.ganttChartData.data.push({
          "id": data[i].id,
          "text": data[i].nama_bagian,
          "type": "project",
          "parent" : data[i].parent_id,
          "start_date": new Date(data[i].start_date),
          "end_date": new Date(data[i].end_date),
          "order": "",
          "duration": "",
          "progress": data[i].progress,
          "open": false,
          "color": data[i].color
        });
      }else if(data[i].tipe_jadwal == 'RS' || data[i].tipe_jadwal == 'PS'){
        this.ganttChartData.data.push({
          "id": data[i].id,
          "text": data[i].label,
          "type": "project",
          "parent" : data[i].parent_id,
          "start_date": new Date(data[i].start_date),
          "end_date": new Date(data[i].end_date),
          "order": "",
          "duration": "",
          "progress": "",
          "open": false,
          "color": data[i].color
        });
      }

    }

    this.ganttChart.reloadData(this.ganttChartData);

  }

  getGanttData(){
    var _this = this;
    var url = "/schedules?searchTxt=" + this.searchTextBox.getValue() + "&level=" + this.levelCmb.getValue();
    $.ajax({
      method: "GET",
      url: url,
      data: {}
    }).done(function(data) {
        _this.processData(data);
    }).fail(function() {
        alert('Error while doing operation');
    });
  }

}
