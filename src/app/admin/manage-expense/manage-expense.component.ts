import { Expense } from './../../model/expense.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MDBDatePickerComponent, IMyOptions } from 'ng-uikit-pro-standard';
import { ToastService } from 'ng-uikit-pro-standard';
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';
import { humanizeBytes } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-manage-expense',
  templateUrl: './manage-expense.component.html',
  styleUrls: ['./manage-expense.component.scss']
})
export class ManageExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  expenseTypeSelect: Array<any>;
  paymentTypeSelect: Array<any>;
  paymentStatusSelect: Array<any>;
  paymentModeSelect: Array<any>;
  uploadInput: EventEmitter<UploadInput>;
  files: UploadFile[];
  dragOver: boolean;
  humanizeBytes: Function;
  expenseDet: Expense;
  @ViewChild('datePicker', { static: true }) datePicker: MDBDatePickerComponent;
  
  public myDatePickerOptions: IMyOptions = {
    minYear: 2020,
    maxYear: 2030
  }

  constructor(
        private fb: FormBuilder,
        private toastr: ToastService
      ) { 
    this.expenseTypeSelect = [
      { value: 'Cultural', label: 'Cultural'},
      { value: 'Decoration', label: 'Decoration'},
      { value: 'Food', label: 'Food'},
      { value: 'Idol', label: 'Idol'},
      { value: 'Legal', label: 'Legal'},
      { value: 'Operation', label: 'Operation'},
      { value: 'Staionary', label: 'Staionary'},
      { value: 'Venue', label: 'Venue'},
      { value: 'Others', label: 'Others'},
    ];

    this.paymentTypeSelect = [
      { value: 'FullPayment', label: 'Full Payment'},
      { value: 'Advance', label: 'Advance'},
    ];

    this.paymentStatusSelect = [
      { value: 'Paid', label: 'Paid'},
      { value: 'Pending', label: 'Pending'},
      { value: 'Partial', label: 'Partial'},
    ];

    this.paymentModeSelect = [
      { value: 'AccountTransfer', label: 'Account Transfer'},
      { value: 'Cash', label: 'Cash'},
      { value: 'Cheque', label: 'Cheque'},
      { value: 'GPay', label: 'Google Pay'},
      { value: 'paytm', label: 'PayTM'}
    ];

    this.files = [];
      this.uploadInput = new EventEmitter<UploadInput>();
      this.humanizeBytes = humanizeBytes;
  }

  ngOnInit(): void {
    this.loadControls();
  }


  loadControls() {
    
    this.expenseForm = this.fb.group({
      'expenseType': new FormControl({value: '', disabled: false}, [Validators.required]),  
      'expenseDescription': new FormControl({value: '', disabled: false}, [Validators.required]),
      'vendorName': new FormControl({value: '', disabled: false}, [Validators.required]),
      'dtOfExpense': new FormControl({value: '', disabled: false}, [Validators.required]),
      'totalAmount': new FormControl({value: '', disabled: false}, [Validators.required, Validators.pattern('^[0-9]*$')]),
      'paymentType': new FormControl({value: '', disabled: false}, [ Validators.required]),
      'paymentStatus': new FormControl({value: '', disabled: false}, [Validators.required]),
      'amountPaid': new FormControl({value: '', disabled: false}, [Validators.required,Validators.pattern('^[0-9]*$')]),
      'paymentMode': new FormControl({value: '', disabled: false}, [Validators.required]),
      'referenceNo': new FormControl({value: '', disabled: false}, []),
      'dtOfPayment': new FormControl('', [Validators.required]),
      'expensePic': new FormControl('')
      
    });
  }

  showFiles() {
    let files = '';
      for (let i = 0; i < this.files.length; i ++) {
        files += this.files[i].name;
         if (!(this.files.length - 1 === i)) {
           files += ',';
        }
      }
    return files;
  }


  onSubmit() {
    if ( this.expenseForm.valid ) {
      this.expenseDet = this.expenseForm.value;
    }
  }

  onUploadOutput(output: UploadOutput | any): void {
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    this.showFiles();
  }

  reset() {

  }

}
