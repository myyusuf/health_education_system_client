import { guid } from '../../base/Utils';
import ComboBox from "../../base/components/ComboBox";

export default class RecommendationComboBox {

  constructor(options) {
    this.id = guid();

    var comboBoxOptions = {
      displayMember: "nama",
      valueMember: "id",
      placeHolder: 'Pilih Rekomendasi',
      width: '100%',
      height: 25,
      theme: 'metro',
    };

    this.comboBox = new ComboBox({
      url: '/scores/recommendations',
      value: options.value,
      clearSelectionEnabled: true,
      comboBoxOptions: comboBoxOptions,
      onChange: function(value){
        //
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
