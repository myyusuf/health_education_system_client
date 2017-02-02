import { guid } from '../../base/Utils';
import Form from '../../base/components/Form';
import NumberInput from '../../base/components/NumberInput';
import TextBox from '../../base/components/TextBox';
import CheckBox from '../../base/components/CheckBox';
import Label from '../../base/components/Label';

export default class ScoreInfo {

  constructor(options) {
    this.id = guid();

    this.siswaId = options.siswaId;
    var score = {};

    var preTestNumberInput = new NumberInput({value: score.pre_test, width: '70%', height: 25});
    var tugasIlmiahNumberInput = new NumberInput({value: score.tugas_ilmiah, width: '70%', height: 25});
    var diskusiMingguanNumberInput = new NumberInput({value: score.diskusi_mingguan, width: '70%', height: 25});
    var ujianNumberInput = new NumberInput({value: score.ujian, width: '70%', height: 25});
    var postTestNumberInput = new NumberInput({value: score.post_test, width: '70%', height: 25});
    var nilaiAkhirNumberInput = new NumberInput({value: score.nilai_akhir, width: '70%', height: 25});
    var seminarNumberInput = new NumberInput({value: score.seminar, width: '70%', height: 25});
    var portofolioNumberInput = new NumberInput({value: score.portofolio, width: '70%', height: 25});
    var judulLaporanKasusTextBox = new TextBox({value: score.judul_laporan_kasus, height: 25, width: '70%'});

    this.preTestNumberInput = preTestNumberInput;
    this.tugasIlmiahNumberInput = tugasIlmiahNumberInput;
    this.diskusiMingguanNumberInput = diskusiMingguanNumberInput;
    this.ujianNumberInput = ujianNumberInput;
    this.postTestNumberInput = postTestNumberInput;
    this.nilaiAkhirNumberInput = nilaiAkhirNumberInput;
    this.seminarNumberInput = seminarNumberInput;
    this.portofolioNumberInput = portofolioNumberInput;
    this.judulLaporanKasusTextBox = judulLaporanKasusTextBox;

    var formItems = [
      {
        name: 'pre_test',
        label: 'Nilai Pre-Test',
        content: preTestNumberInput
      },
      {
        name: 'tugas_ilmiah',
        label: 'Tugas Ilmiah',
        content: tugasIlmiahNumberInput
      },
      {
        name: 'diskusi_mingguan',
        label: 'Tugas Ilmiah',
        content: diskusiMingguanNumberInput
      },
      {
        name: 'ujian',
        label: 'Ujian',
        content: ujianNumberInput
      },
      {
        name: 'post_test',
        label: 'Post Test',
        content: postTestNumberInput
      },
      {
        name: 'nilai_akhir',
        label: 'Nilai Akhir',
        content: nilaiAkhirNumberInput
      },
      {
        name: 'seminar',
        label: 'Seminar',
        content: seminarNumberInput
      },
      {
        name: 'portofolio',
        label: 'Portofolio',
        content: portofolioNumberInput
      },
      {
        name: 'judul_laporan_kasus',
        label: 'Judul Laporan Kasus',
        content: judulLaporanKasusTextBox
      },
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "PUT",
              url: "/scores/" + score.id,
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

  changeDivision(bagianId){

    var _this = this;

    this.bagianId = bagianId;

    var url = 'scoreinfo/' + this.siswaId;

    $.ajax({
      method: "GET",
      url: url ,
      data: {
        bagian: bagianId
      }
    }).done(function(data) {

      if(data.length > 0){
        _this.preTestNumberInput.setValue(data[0].pre_test);
        _this.tugasIlmiahNumberInput.setValue(data[0].tugas_ilmiah);
        _this.diskusiMingguanNumberInput.setValue(data[0].diskusi_mingguan);
        _this.ujianNumberInput.setValue(data[0].ujian);
        _this.postTestNumberInput.setValue(data[0].post_test);
        _this.nilaiAkhirNumberInput.setValue(data[0].nilai_akhir);
        _this.seminarNumberInput.setValue(data[0].seminar);
        _this.portofolioNumberInput.setValue(data[0].portofolio);
        _this.judulLaporanKasusTextBox.setValue(data[0].judul_laporan_kasus);
      }else{
        _this.preTestNumberInput.setValue(0);
        _this.tugasIlmiahNumberInput.setValue(0);
        _this.diskusiMingguanNumberInput.setValue(0);
        _this.ujianNumberInput.setValue(0);
        _this.postTestNumberInput.setValue(0);
        _this.nilaiAkhirNumberInput.setValue(0);
        _this.seminarNumberInput.setValue(0);
        _this.portofolioNumberInput.setValue(0);
        _this.judulLaporanKasusTextBox.setValue('');
      }


    }).fail(function() {
        alert('Error while doing operation');
    });
  }

  render(container) {

    var innerContainer = $('<div style="padding: 10px; padding-left: 15px;"></div>');
    innerContainer.appendTo(container);
    this.form.render(innerContainer);
  }
}
