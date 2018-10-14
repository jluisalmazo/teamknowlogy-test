import { Component } from '@angular/core';
import { ModeService } from '../mode.service';
import * as $ from 'jquery';
import 'bootstrap/js/dist/modal';

//interface for Parent-Child interaction.
export interface myinterface {
  removeInstance(index: number);
}

@Component({
  selector: 'app-question-checkboxes',
  templateUrl: './question-checkboxes.component.html',
  styleUrls: ['./question-checkboxes.component.scss']
})

export class QuestionCheckboxesComponent {

  // These parameters are passed when the component is dinamically built.
  public questionModalId = '';
  public optionsModalId = '';
  public deleteOptionModalId = '';
  public removeQuestionModalId = '';

  // This variables are for removing the instance of this component.
  public index: number;
  public selfRef: QuestionCheckboxesComponent;
  public compInteraction: myinterface;   // interface for Parent-Child interaction.

  // Component's general variables
  public question = 'Texto de la pregunta';
  public optionsModalTitle = '';
  public editMode = false;
  public addMode = false
  public optionId = '';
  public optionLabel = '';

  options = [
    { id: 1, label: 'Opción de ejemplo 1' },
    { id: 2, label: 'Opción de ejemplo 2' }
  ];

  constructor(private readonly appMode: ModeService) { }

  showModalRadioButton(id?: string, label?: string) {

    if ((id != undefined) && (label != undefined)) {

      // Edit option
      this.editMode = true;
      this.addMode = false;
      this.optionId = id;
      this.optionLabel = label;
      this.optionsModalTitle = 'Editar opción';

    } else {

      // Add option
      this.addMode = true;
      this.editMode = false;
      this.optionId = '';
      this.optionLabel = '';
      this.optionsModalTitle = 'Agregar nueva opción';
    }
    $('#' + this.optionsModalId).modal('show');
  }

  addRadiobutton(label) {

    let newId = 1;
    if (this.options[this.options.length - 1] != undefined) {
      newId = this.options[this.options.length - 1].id + 1;
    }
    this.options.push({ 'id': newId, 'label': label });
    $('#' + this.optionsModalId).modal('hide');
    this.addMode = false;
  }

  editRadiobutton(id, label) {

    this.findAndReplace(this.options, id, label);
    $('#' + this.optionsModalId).modal('hide');
    this.editMode = false;
  }

  findAndReplace(object, id, label) {

    object.map(function (a) {
      if (a.id == id) {
        a.label = label
      }
    })
  }

  showModalDeleteOption(id, label) {

    this.optionId = id;
    this.optionLabel = label;
    $('#' + this.deleteOptionModalId).modal('show');
  }

  deleteOption(id) {

    const index = this.options.findIndex(function (arr) { return Number(arr.id) === Number(id) });
    if (index > -1) {
      this.options.splice(index, 1);
    }
    $('#' + this.deleteOptionModalId).modal('hide');
  }

  showModalEditQuestion() {

    $('#' + this.questionModalId).modal('show');
  }

  saveQuestionChanges(question) {

    this.question = question;
    $('#' + this.questionModalId).modal('hide');
  }

  showModalRemoveQuestion() {

    $('#' + this.removeQuestionModalId).modal('show');
  }

  removeThisQuestion(index) {

    $('#' + this.removeQuestionModalId).modal('hide');
    this.compInteraction.removeInstance(index);
  }

}