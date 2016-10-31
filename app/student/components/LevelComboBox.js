import { guid } from '../../base/Utils';
import ComboBox from "../../base/components/ComboBox";

export default class LevelComboBox {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var levelList = [{id: 1, nama: 'Tingkat 1'}, {id: 2, nama: "Tingkat 2"}];
    var comboBoxOptions = {
      displayMember: "nama",
      valueMember: "id",
      selectedIndex: 0,
      width: '100%',
      height: 25,
      theme: 'metro',
      selectionMode: 'dropDownList'
    };

    this.comboBox = new ComboBox({
      localData: levelList,
      value: options.value,
      comboBoxOptions: comboBoxOptions,
      onChange: function(value){
        if(options.onChange){
          options.onChange(value);
        }
      }
    });

  }

  getId(){
    return this.comboBox.getId();
  }

  render(container){
    this.comboBox.render(container);
  }

  getValue(){
    return this.comboBox.getValue();
  }

}
