import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import BpmnModeler from 'bpmn-js/lib/Modeler';

interface Node {
  id?: string;
  name?: string;
}

@Component({
  selector: 'app-bpmn2',
  templateUrl: './bpmn2.component.html',
  styleUrls: ['./bpmn2.component.scss']
})
export class Bpmn2Component implements OnInit {
  modeler: BpmnModeler;
  form: Node = {};
  saveHref: any;
  saveName: string;
  element: {};

  private readonly newDiagram = 'assets/bpmn/init.bpmn';
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.initModeler();
    this.handleModeler();
  }

  initModeler() {
    this.modeler = new BpmnModeler({
      container: '#canvas',
    });

    // 监听流程图change事件
    const that = this;
    this.modeler.on('commandStack.changed', (e) => {
      that.saveSVG(e);
      that.saveDiagram(e);
    });
    this.initDiagram();
  }

  initDiagram() {
    this.load(this.newDiagram);
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  load(xml) {
    this.http.get(xml, {
      headers: { observe: 'response' }, responseType: 'text'
    }).subscribe(
      (x: any) => {
        // console.log('Fetched XML, now importing: ', x);
        this.modeler.importXML(x, this.handleError);
      },
      this.handleError
    );
  }

  saveDiagram(e) {
    this.modeler.saveXML({ format: true }, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        this.setEncoded(xml, 'bpmn.xml');
      }
    });
    e.preventDefault();
    e.stopPropagation();
  }

  saveSVG(e) {
    this.modeler.saveSVG((err, svg) => {
      if (err) {
        console.error(err);
      } else {
        this.setEncoded(svg, 'bpmn.svg');
      }
    });
    e.preventDefault();
    e.stopPropagation();
  }

  setEncoded(data, name) {
    const encodedData = encodeURIComponent(data);
    if (data) {
      this.saveHref = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
      this.saveName = name;
    }
  }

  // 监听节点名称
  onNodeNameChange(name: string) {
    const modeling = this.modeler.get('modeling');
    modeling.updateLabel(this.element, name);
  }

  handleModeler() {
    // 监听节点选择变化
    this.modeler.on('selection.changed', e => {
      const element = e.newSelection[0];
      this.element = element;
      console.log(this.element);
      if (!element) { return; }
      // this.$message({
      //   message:"出发点击事件",
      //   type:"success"
      // })
      this.form = {
        ...element.businessObject,
        ...element.businessObject.$attrs
      };
      // if (this.form.userType === 'candidateUsers') {
      //   this.form["candidateUsers"] =
      //     this.form["candidateUsers"].split(",") || [];
      // }
      console.log(this.form);
    });

    this.nodePropChange();
  }

  // 监听节点属性变化
  nodePropChange() {
    this.modeler.on('element.changed', e => {
      const { element } = e;
      if (!element) { return; }
      //  新增节点需要更新回属性面板
      if (element.id === this.form.id) {
        this.form.name = element.businessObject.name;
        this.form = { ...this.form };
      }
    });
  }
}
