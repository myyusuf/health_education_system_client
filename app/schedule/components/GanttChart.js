import {
  guid
} from '../../base/Utils';

export default class GanttChart {

  constructor(options) {

    var _this = this;

    this.id = guid();
    this.data = {
    	data: []
    };

    gantt.config.scale_unit = "month";
    gantt.config.step = 1;
    gantt.config.date_scale = "%F, %Y";
    gantt.config.min_column_width = 100;

    gantt.config.scale_height = 90;
    gantt.config.column_height = 50;
    // gantt.config.start_date = new Date(2013, 03, 09);
    // gantt.config.end_date = new Date(2017, 03, 09);

    gantt.config.fit_tasks = true;

    this.weekScaleTemplate = function(date){
      var dateToStr = gantt.date.date_to_str("%d %M");
      var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
      return '<div style="">' + dateToStr(date) + " - " + dateToStr(endDate) + '</div>';
    };

    gantt.config.subscales = [
      {unit:"week", step:1, template: this.weekScaleTemplate},
      {unit:"day", step:1, date:"%d %D" }
    ];

    gantt.attachEvent("onTaskDblClick", function(id, e) {
        console.log("You've just clicked an item with id="+id);
        if(options.onTaskDblClick){
            options.onTaskDblClick(id);
        }

    });

    //Weekends Color
    gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
            return "weekend";
        }
    };
    gantt.templates.task_cell_class = function(item,date){
        if(date.getDay()==0||date.getDay()==6){
            return "weekend" ;
        }
    };
  }

  render(container) {
    var ganttChartContainer = $('<div style="height: 100%; width: 100%;"></div>');
    ganttChartContainer.attr('id', this.id);
    ganttChartContainer.appendTo(container);

    gantt.init(this.id);
    gantt.parse(this.data);

    var dp = new gantt.dataProcessor("schedules");
    dp.init(gantt);
    dp.setTransactionMode("REST");
  }

  useWeekScale(){

    gantt.config.subscales = [
      {unit:"week", step:1, template: this.weekScaleTemplate},
    ];

    this.refresh();
  }

  useDayScale(){
    gantt.config.subscales = [
      {unit:"week", step:1, template: this.weekScaleTemplate},
      {unit:"day", step:1, date:"%D" }
    ];

    this.refresh();
  }

  refresh(){
    gantt.parse(this.data);
  }

  reloadData(newData){
    this.data = newData;
    gantt.clearAll();
    gantt.parse(this.data);
  }
}
