import { guid } from '../../base/Utils';
import Form from '../../base/components/Form';
import NumberInput from '../../base/components/NumberInput';
import CheckBox from '../../base/components/CheckBox';
import Label from '../../base/components/Label';
import TextArea from '../../base/components/TextArea';

export default class ProblemInfo {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.riwayatMppdId = options.riwayatMppdId;
    this.bagianId = 0;
    this.onSaveSuccess = options.onSaveSuccess;

    var checkBox1 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat baca referat karena alasan pembimbing'});
    var checkBox2 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat baca referat karena alasan MPPD'});
    var checkBox3 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat ujian karena alasan penguji'});
    var checkBox4 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat ujian karena alasan MPPD'});
    var checkBox5 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat menyelesaikan portofolio'});
    var checkBox6 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat dapat TTD bakordik'});
    var checkBox7 = new CheckBox({height: 25, width: '100%',
    label: 'Tidak lulus ujian supervisor'});
    var checkBox8 = new CheckBox({height: 25, width: '100%',
    label: 'Adaptasi'});
    var checkBox9 = new CheckBox({height: 25, width: '100%',
    label: 'Tidak lulus post test'});
    var checkBox10 = new CheckBox({height: 25, width: '100%',
    label: 'Terlambat keluar siklus karena jumlah kehadiran seminar <80%'});

    var checkBox11 = new CheckBox({height: 25, width: '100%',
    label: 'Tidak aktif tanpa keterangan'});

    var descriptionTextArea = new TextArea({height: 80, width: '70%',
    placeHolder: 'Deskripsi masalah'});

    var postTestCountNumberInput = new NumberInput({
      value: 0, width: '50%', height: 25,
      basicProperties: {
        min: 0,
        max: 99,
        decimalDigits: 0,
        digits: 2,
        spinButtons: true
      }
    });

    this.checkBox1 = checkBox1;
    this.checkBox2 = checkBox2;
    this.checkBox3 = checkBox3;
    this.checkBox4 = checkBox4;
    this.checkBox5 = checkBox5;
    this.checkBox6 = checkBox6;
    this.checkBox7 = checkBox7;
    this.checkBox8 = checkBox8;
    this.checkBox9 = checkBox9;
    this.checkBox10 = checkBox10;
    this.checkBox11 = checkBox11;
    this.descriptionTextArea = descriptionTextArea;
    this.postTestCountNumberInput = postTestCountNumberInput;

    var formItems = [
      {
        name: 'masalah1',
        label: '',
        content: checkBox1
      },
      {
        name: 'masalah2',
        label: '',
        content: checkBox2
      },
      {
        name: 'masalah3',
        label: '',
        content: checkBox3
      },
      {
        name: 'masalah4',
        label: '',
        content: checkBox4
      },
      {
        name: 'masalah5',
        label: '',
        content: checkBox5
      },
      {
        name: 'masalah6',
        label: '',
        content: checkBox6
      },
      {
        name: 'masalah7',
        label: '',
        content: checkBox7
      },
      {
        name: 'masalah8',
        label: '',
        content: checkBox8
      },
      {
        name: 'masalah9',
        label: '',
        content: checkBox9
      },
      {
        name: 'jumlah_hari_post_test',
        label: '',
        content: postTestCountNumberInput
      },
      {
        name: 'masalah10',
        label: '',
        content: checkBox10
      },
      {
        name: 'masalah11',
        label: '',
        content: checkBox11
      },
      {
        name: 'keterangan',
        label: '',
        content: descriptionTextArea
      },
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '40px',
      onValidationSuccess: function(formValue){

        formValue['riwayat_mppd_id'] = _this.riwayatMppdId;
        formValue['bagian_id'] = _this.bagianId;

        $.ajax({
              method: "POST",
              url: "/probleminfo",
              data: formValue
            }).done(function() {
                $("#successNotification").jqxNotification("open");
                _this.window.close();
                if(_this.onSaveSuccess){
                  _this.onSaveSuccess();
                }
            }).fail(function( jqXHR, textStatus, errorThrown) {
                var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
                $("#errorNotification").html('<div>' + errorMessage + '</div>');
                $("#errorNotification").jqxNotification("open");
            });
      }
    }

    this.form = new Form(formOptions);
  }

  render(container) {
    this.form.render(container);
  }

  changeDivision(bagianId){

    var _this = this;

    this.bagianId = bagianId;

    var url = 'probleminfo/' + this.riwayatMppdId;

    $.ajax({
      method: "GET",
      url: url ,
      data: {
        bagian: bagianId
      }
    }).done(function(data) {

      if(data.length > 0){
        _this.checkBox1.setValue(data[0].masalah1);
        _this.checkBox2.setValue(data[0].masalah2);
        _this.checkBox3.setValue(data[0].masalah3);
        _this.checkBox4.setValue(data[0].masalah4);
        _this.checkBox5.setValue(data[0].masalah5);
        _this.checkBox6.setValue(data[0].masalah6);
        _this.checkBox7.setValue(data[0].masalah7);
        _this.checkBox8.setValue(data[0].masalah8);
        _this.checkBox9.setValue(data[0].masalah9);
        _this.checkBox10.setValue(data[0].masalah10);
        _this.checkBox11.setValue(data[0].masalah11);
        _this.postTestCountNumberInput.setValue(data[0].jumlah_hari_post_test);
        _this.descriptionTextArea.setValue(data[0].keterangan);
      }else{
        _this.checkBox1.setValue(0);
        _this.checkBox2.setValue(0);
        _this.checkBox3.setValue(0);
        _this.checkBox4.setValue(0);
        _this.checkBox5.setValue(0);
        _this.checkBox6.setValue(0);
        _this.checkBox7.setValue(0);
        _this.checkBox8.setValue(0);
        _this.checkBox9.setValue(0);
        _this.checkBox10.setValue(0);
        _this.checkBox11.setValue(0);
        _this.postTestCountNumberInput.setValue(0);
        _this.descriptionTextArea.setValue('');
      }


    }).fail(function() {
        alert('Error while doing operation');
    });
  }

  validate(){
    this.form.validate();
  }
}
