import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BpmnComponent } from './components/bpmn/bpmn.component';
import { TestComponent } from './pages/test/test.component';
import { Bpmn2Component } from './components/bpmn2/bpmn2.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Test2Component } from './pages/test2/test2.component';
import { DragformComponent } from './components/dragform/dragform.component';
import { DynamicFormComponent } from './components/dragform/components/dynamic-form/dynamic-form.component';
import { DynamicFormPropComponent } from './components/dragform/components/dynamic-form-prop/dynamic-form-prop.component';


@NgModule({
  declarations: [
    AppComponent,
    BpmnComponent,
    TestComponent,
    Bpmn2Component,
    Test2Component,
    DragformComponent,
    DynamicFormComponent,
    DynamicFormPropComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
