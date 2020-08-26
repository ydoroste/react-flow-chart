import { IChart } from '../../src'

export const chartSimple: IChart = {
  offset: {
    x: 0,
    y: 0,
  },
  nodes: {
    node1: {
      id: 'node1',
      type: 'output-only',
      position: {
        x: 300,
        y: 100,
      },
      properties: {
        display:{
          label: 'dropdown',
          placeholder:'',
          description:'',
          disabled: false,
          errormessage:'',
          class : '',
          accept:'',
          type:'',
          options:[
            {value: "place_holder_option_1",text: "Place holder option 1",key: "dropdown_option_DB97CBD7-0300-413F-BE8A-01F8D44DDC49"},
            {value: "sgdhs", text: "dfghsdf", key: "C757F3B7-4E6D-4D9A-9B46-66BC6645B6A0"}
          ]
        },
        validation:{
          required: false,
          unique: false,
          minLength:'',
          maxLength: '',
          regex:''
        },
        data:{
          defaultValue:''
        },
        element: "Dropdown",
        text: "Dropdown",
        static: undefined,
        required: false,
        canHaveAnswer: true,
        canHavePageBreakBefore: true,
        canHaveAlternateForm: true,
        canHaveDisplayHorizontal: true,
        canHaveOptionCorrect: true,
        canHaveOptionValue: true,
        field_name: "dropdown_74D18198-8FFE-4ADE-814D-2BA1EA96A0F5",
        label: 'dropdown',
        placeholder:'dropdown',
        description:'',
        options:[
          {value: "place_holder_option_1",text: "Place holder option 1",key: "dropdown_option_DB97CBD7-0300-413F-BE8A-01F8D44DDC49"},
          {value: "sgdhs", text: "dfghsdf", key: "C757F3B7-4E6D-4D9A-9B46-66BC6645B6A0"}
        ]
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'output',
          properties: {
            value: 'yes',
          },
        },
        port2: {
          id: 'port2',
          type: 'output',
          properties: {
            value: 'no',
          },
        },
      },
    },
    node2: {
      id: 'node2',
      type: 'input-output',
      position: {
        x: 300,
        y: 300,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
    node3: {
      id: 'node3',
      type: 'input-output',
      position: {
        x: 100,
        y: 600,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
    node4: {
      id: 'node4',
      type: 'input-output',
      position: {
        x: 500,
        y: 600,
      },
      ports: {
        port1: {
          id: 'port1',
          type: 'input',
        },
        port2: {
          id: 'port2',
          type: 'output',
        },
      },
    },
  },
  links: {
    link1: {
      id: 'link1',
      from: {
        nodeId: 'node1',
        portId: 'port2',
      },
      to: {
        nodeId: 'node2',
        portId: 'port1',
      },
      properties: {
        label: 'example link label',
      },
    },
    link2: {
      id: 'link2',
      from: {
        nodeId: 'node2',
        portId: 'port2',
      },
      to: {
        nodeId: 'node3',
        portId: 'port1',
      },
      properties: {
        label: 'another example link label',
      },
    },
    link3: {
      id: 'link3',
      from: {
        nodeId: 'node2',
        portId: 'port2',
      },
      to: {
        nodeId: 'node4',
        portId: 'port1',
      },
    },
  },
  selected: {},
  hovered: {},
}
