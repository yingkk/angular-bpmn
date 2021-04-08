import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import BpmnModeler from 'bpmn-js/lib/Modeler';
interface Role {
  id?: string;
  name?: string;

}
interface Dept {
  id?: string;
  name?: string;
}
interface User {
  id?: string;
  name?: string;
  deptId?: string;
  roleId: string;
}
interface Node {
  processId?: string;
  id?: string;
  name?: string;
  nodeUsers?: string[];
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
  element: any = {};
  depts: Dept[] = [
    {
      id: '101',
      name: '设计'
    },
    {
      id: '102',
      name: '开发'
    },
    {
      id: '103',
      name: '运维'
    }
  ];
  roles: Role[] = [
    {
      id: '201',
      name: '管理员'
    },
    {
      id: '202',
      name: '内容管理员'
    },
    {
      id: '203',
      name: '测试员'
    }
  ];
  users: User[] = [
    {
      id: '1',
      name: 'jack',
      deptId: '102',
      roleId: '202'
    },
    {
      id: '2',
      name: 'roles',
      deptId: '103',
      roleId: '203'
    },
    {
      id: '3',
      name: 'jam',
      deptId: '103',
      roleId: '202'
    },
    {
      id: '4',
      name: 'tom',
      deptId: '101',
      roleId: '201'
    },
    {
      id: '5',
      name: 'jerry',
      deptId: '102',
      roleId: '202'
    },
    {
      id: '6',
      name: 'lily',
      deptId: '102',
      roleId: '203'
    },
    {
      id: '7',
      name: 'momo',
      deptId: '101',
      roleId: '201'
    },
    {
      id: '8',
      name: 'wen',
      deptId: '103',
      roleId: '201'
    },
    {
      id: '9',
      name: 'kk',
      deptId: '101',
      roleId: '202'
    },
    {
      id: '10',
      name: 'xx',
      deptId: '102',
      roleId: '201'
    }
  ];
  options: {};
  radioValue = 'deptId';


  private readonly newDiagram = 'assets/bpmn/init.bpmn';
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.initModeler();
    this.handleModeler();
    this.initOptions();
   // console.log(this.options)
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
    // 默认初始化
    // this.modeler.createDiagram();
    // 自定义初始化
    this.load(this.newDiagram);
  }

  handleModeler() {
    // 监听节点选择变化
    this.modeler.on('selection.changed', e => {
      const element = e.newSelection[0];
      this.element = element;
      if (!element) { return; }
      // this.$message({
      //   message:"出发点击事件",
      //   type:"success"
      // })
      this.form = {
        ...element.businessObject,
        ...element.businessObject.$attrs
      };
      console.log(this.form)
      this.form.nodeUsers = [];
      // console.log(this.form);
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

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  onRadioChange(e) {
    this.radioValue = e;
    this.initOptions();
    this.form.nodeUsers = [];
  }
  // initUsers
  initOptions() {
    this.options = this.users.reduce((init, cur, index) => {
      if (!init[cur[this.radioValue]]) {
        init[cur[this.radioValue]] = [];
      } else {
        init[cur[this.radioValue]].push(cur);
      }
      return init;
    }, {});
  }

  // form panel
  // 监听节点名称
  onNodeNameChange(name: string) {
    const modeling = this.modeler.get('modeling');
    modeling.updateLabel(this.element, name);
  }

  onNodeUsersChange(users: string[]) {
    this.form.nodeUsers = users;
    const modeling = this.modeler.get('modeling');
    this.updateProperty(users);
  }

  updateProperty(property: any) {
    const modeling = this.modeler.get('modeling');
    modeling.updateProperties(this.element, property);
  }


  // toolbar
  // TODO
  validateXml(xml) {
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

  handleUndo() {
    this.modeler.get('commandStack').undo();
  }

  handleRedo() {
    this.modeler.get('commandStack').redo();
  }
}
