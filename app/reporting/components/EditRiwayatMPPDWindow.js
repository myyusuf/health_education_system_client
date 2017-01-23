import { guid } from '../../base/Utils';
import Tabs from "../../base/components/Tabs";
import Button from '../../base/components/Button';
import AddWindow from '../../base/components/AddWindow';
import StudentForm from './StudentForm';
export default class EditRiwayatMPPDWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var student = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var studentForm = new StudentForm(student, {});

    this.window = new AddWindow({
      width: 550,
      height: 600,
      title: 'Edit Riwayat MPPD',
      content: studentForm,
      onSave: function(){
        form.validate();
      },
      onCancel: function(){
        _this.window.close();
      }
    });

  }

  render(container) {

    var _this = this;
    this.window.render(container);

  }

  open(){
    this.window.open();
  }
}
