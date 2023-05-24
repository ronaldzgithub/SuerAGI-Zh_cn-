import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Agents.module.css';

export default function AgentCreate({agent, createAgent}) {
  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [agentName, setAgentName] = useState(agent.name);
  const [agentDescription, setAgentDescription] = useState(agent.description);
  const [selfEvaluation, setSelfEvaluation] = useState('');
  const [basePrompt, setBasePrompt] = useState('');
  const [longTermMemory, setLongTermMemory] = useState(true);

  const goalsArray = ['agent goal 1', 'agent goal 2', 'agent goal 3']
  const [goals, setGoals] = useState(goalsArray);

  const constraintsArray = ['new constraint 1', 'new constraint 2', 'new constraint 3']
  const [constraints, setConstraints] = useState(constraintsArray);

  const models = ['Open AI - 3.5', 'Open AI - 4.0', 'Open AI - 3.0']
  const [model, setModel] = useState(agent.model);
  const modelRef = useRef(null);
  const [modelDropdown, setModelDropdown] = useState(false);

  const agentTypes = ["Maintain Task Queue", "Don't Maintain Task Queue"]
  const [agentType, setAgentType] = useState(agentTypes[0]);
  const agentRef = useRef(null);
  const [agentDropdown, setAgentDropdown] = useState(false);

  const exitCriteria = ["No exit criterion", "System defined", "User defined", "Number of steps/tasks"]
  const [exitCriterion, setExitCriterion] = useState(exitCriteria[0]);
  const exitRef = useRef(null);
  const [exitDropdown, setExitDropdown] = useState(false);

  const stepTimes = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]
  const [stepTime, setStepTime] = useState(stepTimes[0]);
  const stepRef = useRef(null);
  const [stepDropdown, setStepDropdown] = useState(false);

  const rollingWindows = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]
  const [rollingWindow, setRollingWindow] = useState(rollingWindows[0]);
  const rollingRef = useRef(null);
  const [rollingDropdown, setRollingDropdown] = useState(false);

  const databases = ["Pinecone", "Milvus", "Zilliz"]
  const [database, setDatabase] = useState(databases[0]);
  const databaseRef = useRef(null);
  const [databaseDropdown, setDatabaseDropdown] = useState(false);

  const permissions = ["No autonomous (Ask permission for every action)", "Semi-autonomous", "God Mode (fully autonomous)"]
  const [permission, setPermission] = useState(permissions[0]);
  const permissionRef = useRef(null);
  const [permissionDropdown, setPermissionDropdown] = useState(false);

  const allTools = ['gmailer', 'jira-v2', 'openai', 'superagi']
  const [myTools, setMyTools] = useState(agent.tools);
  const toolRef = useRef(null);
  const [toolDropdown, setToolDropdown] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        setModelDropdown(false)
      }

      if (agentRef.current && !agentRef.current.contains(event.target)) {
        setAgentDropdown(false)
      }

      if (exitRef.current && !exitRef.current.contains(event.target)) {
        setExitDropdown(false)
      }

      if (stepRef.current && !stepRef.current.contains(event.target)) {
        setStepDropdown(false)
      }

      if (rollingRef.current && !rollingRef.current.contains(event.target)) {
        setRollingDropdown(false)
      }

      if (databaseRef.current && !databaseRef.current.contains(event.target)) {
        setDatabaseDropdown(false)
      }

      if (permissionRef.current && !permissionRef.current.contains(event.target)) {
        setPermissionDropdown(false)
      }

      if (toolRef.current && !toolRef.current.contains(event.target)) {
        setToolDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addTool = (index) => {
    setMyTools((prevArray) => [...prevArray, allTools[index]]);
  };
  
  const removeTool = (indexToDelete) => {
    setMyTools((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(indexToDelete, 1);
      return newArray;
    });
  };

  const handlePermissionSelect = (index) => {
    setPermission(permissions[index]);
    setPermissionDropdown(false);
  };

  const handleDatabaseSelect = (index) => {
    setDatabase(databases[index]);
    setDatabaseDropdown(false);
  };

  const handleWindowSelect = (index) => {
    setRollingWindow(rollingWindows[index]);
    setRollingDropdown(false);
  };

  const handleStepSelect = (index) => {
    setStepTime(stepTimes[index]);
    setStepDropdown(false);
  };

  const handleExitSelect = (index) => {
    setExitCriterion(exitCriteria[index]);
    setExitDropdown(false);
  };

  const handleAgentSelect = (index) => {
    setAgentType(agentTypes[index]);
    setAgentDropdown(false);
  };

  const handleModelSelect = (index) => {
    setModel(models[index]);
    setModelDropdown(false);
  };

  const removeGoal = (indexToDelete) => {
    setGoals((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(indexToDelete, 1);
      return newArray;
    });
  };

  const addGoal = () => {
    setGoals((prevArray) => [...prevArray, 'new goal']);
  };

  const removeConstraint = (indexToDelete) => {
    setConstraints((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(indexToDelete, 1);
      return newArray;
    });
  };

  const addConstraint = () => {
    setConstraints((prevArray) => [...prevArray, 'new constraint']);
  };

  const handleNameChange = (event) => {
    setAgentName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setAgentDescription(event.target.value);
  };

  const handleSelfEvaluationChange = (event) => {
    setSelfEvaluation(event.target.value);
  };

  const handleBasePromptChange = (event) => {
    setBasePrompt(event.target.value);
  };

  const handleCreateClick = () => {
    if (agentName.replace(/\s/g, '') === '') {
      toast.dark("Agent name can't be blank", {autoClose: 1800});
      return
    }

    if (agentDescription.replace(/\s/g, '') === '') {
      toast.dark("Agent description can't be blank", {autoClose: 1800});
      return
    }

    const data = {agentName: agentName}
    createAgent(agent, data)
    toast.dark('Agent created successfully', {autoClose: 1800});
  };

  const preventDefault = (e) => {
    e.stopPropagation()
  }

  return (<>
    <div>
      <div className="row" style={{padding: '10px'}}>
        <div className="col-12">
          <div>
            <div className={styles.page_title} style={{marginTop:'10px'}}>Create new agent</div>
          </div>
          <div style={{marginTop:'10px'}}>
            <div>
              <label className={styles.form_label}>Name</label>
              <input className="input_medium" type="text" value={agentName} onChange={handleNameChange}/>
            </div>
            <div style={{marginTop: '15px'}}>
              <label className={styles.form_label}>Description</label>
              <textarea className="textarea_medium" rows={3} value={agentDescription} onChange={handleDescriptionChange}/>
            </div>
            <div style={{marginTop: '15px'}}>
              <label className={styles.form_label}>Goals</label>
              {goals.map((goal, index) => (<div key={index} style={{marginBottom:'10px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{flex:'1'}}><input className="input_medium" type="text" value={goal} onChange={handleNameChange}/></div>
                <div>
                  <button className={styles.agent_button} style={{marginLeft:'4px',padding:'5px'}} onClick={() => removeGoal(index)}>
                    <Image width={20} height={21} src="/images/close_light.png" alt="close-icon"/>
                  </button>
                </div>
              </div>))}
              <button className={styles.agent_button} onClick={addGoal}>
                + Add
              </button>
            </div>
            <div style={{marginTop: '15px'}}>
              <label className={styles.form_label}>Model</label><br/>
              <div className="dropdown_container_search" style={{width:'100%'}}>
                  <div className="custom_select_container" onClick={() => setModelDropdown(!modelDropdown)} style={{width:'100%'}}>
                    {model}<Image width={20} height={21} src={!modelDropdown ? '/images/dropdown_down.png' : '/images/dropdown_up.png'} alt="expand-icon"/>
                  </div>
                  <transition name="fade-scale">
                    {modelDropdown && <div className="custom_select_options" ref={modelRef} style={{width:'100%'}}>
                    {models.map((model, index) => (<div key={index} className="custom_select_option" onClick={() => handleModelSelect(index)} style={{padding:'12px 14px',maxWidth:'100%'}}>
                      {model}
                    </div>))}
                  </div>}
                </transition>
              </div>
            </div>
            <div style={{marginTop: '15px'}}>
              <label className={styles.form_label}>Tools</label>
              <div className="dropdown_container_search" style={{width:'100%'}}>
                <div className="custom_select_container" onClick={() => setToolDropdown(!toolDropdown)} style={{width:'100%'}}>
                  {myTools.length > 0 ? <div style={{display:'flex',overflowX:'scroll'}}>
                    {myTools.map((tool, index) => (<div key={index} className="tool_container" style={{marginTop:'0'}} onClick={preventDefault}>
                      <div className={styles.tool_text}>{tool}</div>
                      <div><Image width={12} height={12} src='/images/close_light.png' alt="close-icon" style={{margin:'-2px -5px 0 2px'}} onClick={() => removeTool(index)}/></div>
                    </div>))}
                  </div> : <div style={{color:'#666666'}}>Select Tools</div>}
                  <Image width={20} height={21} src={!toolDropdown ? '/images/dropdown_down.png' : '/images/dropdown_up.png'} alt="expand-icon"/>
                </div>
                <transition name="fade-scale">
                  {toolDropdown && <div className="custom_select_options" ref={toolRef} style={{width:'100%'}}>
                    {allTools.map((tool, index) => (<div key={index} className="custom_select_option" onClick={() => addTool(index)} style={{padding:'12px 14px',maxWidth:'100%'}}>
                      {tool}
                    </div>))}
                  </div>}
                </transition>
              </div>
            </div>
            <div style={{marginTop: '15px'}}>
              <button className="medium_toggle" onClick={() => setAdvancedOptions(!advancedOptions)} style={advancedOptions ? {background:'#494856'} : {}}>
                {advancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}{advancedOptions ? <Image style={{marginLeft:'10px'}} width={20} height={21} src="/images/dropdown_up.png" alt="expand-icon"/> : <Image style={{marginLeft:'10px'}} width={20} height={21} src="/images/dropdown_down.png" alt="expand-icon"/>}
              </button>
            </div>
            {advancedOptions &&
              <div>
                <div style={{marginTop: '15px'}}>
                  <label className={styles.form_label}>Agent Type</label><br/>
                  <div className="dropdown_container_search" style={{width:'100%'}}>
                    <div className="custom_select_container" onClick={() => setAgentDropdown(!agentDropdown)} style={{width:'100%'}}>
                      {agentType}<Image width={20} height={21} src={!agentDropdown ? '/images/dropdown_down.png' : '/images/dropdown_up.png'} alt="expand-icon"/>
                    </div>
                    <transition name="fade-scale">
                      {agentDropdown && <div className="custom_select_options" ref={agentRef} style={{width:'100%'}}>
                        {agentTypes.map((agent, index) => (<div key={index} className="custom_select_option" onClick={() => handleAgentSelect(index)} style={{padding:'12px 14px',maxWidth:'100%'}}>
                          {agent}
                        </div>))}
                      </div>}
                    </transition>
                  </div>
                </div>
                <div style={{marginTop: '15px'}}>
                  <label className={styles.form_label}>Base prompt</label><br/>
                  <p className={styles.form_label} style={{fontSize:'11px'}}>This will defined the agent role definitely and reduces hallucination. This will defined the agent role definitely and reduces hallucination.</p>
                  <textarea className="textarea_medium" rows={3} value={basePrompt} onChange={handleBasePromptChange}/>
                </div>
                <div style={{marginTop: '15px'}}>
                  <label className={styles.form_label}>Self Evaluation</label><br/>
                  <p className={styles.form_label} style={{fontSize:'11px'}}>Allows the agent to evaluate and correct themselves as they proceed further.</p>
                  <textarea className="textarea_medium" rows={3} value={selfEvaluation} onChange={handleSelfEvaluationChange}/>
                </div>
                <div style={{marginTop: '15px'}}>
                  <label className={styles.form_label}>Constraints</label>
                  {constraints.map((constraint, index) => (<div key={index} style={{marginBottom:'10px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{flex:'1'}}><input className="input_medium" type="text" value={constraint} onChange={handleNameChange}/></div>
                    <div>
                      <button className={styles.agent_button} style={{marginLeft:'4px',padding:'5px'}} onClick={() => removeConstraint(index)}>
                        <Image width={20} height={21} src="/images/close_light.png" alt="close-icon"/>
                      </button>
                    </div>
                  </div>))}
                  <button className={styles.agent_button} onClick={addConstraint}>
                    + Add
                  </button>
                </div>
                <div style={{marginTop: '15px'}}>
                  <label className={styles.form_label}>Exit criterion</label>
                  <div className="dropdown_container_search" style={{width:'100%'}}>
                    <div className="custom_select_container" onClick={() => setExitDropdown(!exitDropdown)} style={{width:'100%'}}>
                      {exitCriterion}<Image width={20} height={21} src={!exitDropdown ? '/images/dropdown_down.png' : '/images/dropdown_up.png'} alt="expand-icon"/>
                    </div>
                    <transition name="fade-scale">
                      {exitDropdown && <div className="custom_select_options" ref={exitRef} style={{width:'100%'}}>
                        {exitCriteria.map((exit, index) => (<div key={index} className="custom_select_option" onClick={() => handleExitSelect(index)} style={{padding:'12px 14px',maxWidth:'100%'}}>
                          {exit}
                        </div>))}
                      </div>}
                    </transition>
                  </div>
                </div>
                <div style={{marginTop: '15px'}}>
                  <label className={styles.form_label}>Time between steps</label>
                  <div className="dropdown_container_search" style={{width:'100%'}}>
                    <div className="custom_select_container" onClick={() => setStepDropdown(!stepDropdown)} style={{width:'100%'}}>
                      {stepTime}<Image width={20} height={21} src={!stepDropdown ? '/images/dropdown_down.png' : '/images/dropdown_up.png'} alt="expand-icon"/>
                    </div>
                    <transition name="fade-scale">
                      {stepDropdown && <div className="custom_select_options" ref={stepRef} style={{width:'100%'}}>
                        {stepTimes.map((step, index) => (<div key={index} className="custom_select_option" onClick={() => handleStepSelect(index)} style={{padding:'12px 14px',maxWidth:'100%'}}>
                          {step}
                        </div>))}
                      </div>}
                    </transition>
                  </div>
                </div>
                <div style={{marginTop: '15px'}}>
                  <label className={styles.form_label}>Short term memory - Rolling window</label>
                  <div className="dropdown_container_search" style={{width:'100%'}}>
                    <div className="custom_select_container" onClick={() => setRollingDropdown(!rollingDropdown)} style={{width:'100%'}}>
                      {rollingWindow} messages<Image width={20} height={21} src={!rollingDropdown ? '/images/dropdown_down.png' : '/images/dropdown_up.png'} alt="expand-icon"/>
                    </div>
                    <transition name="fade-scale">
                      {rollingDropdown && <div className="custom_select_options" ref={rollingRef} style={{width:'100%'}}>
                        {rollingWindows.map((window, index) => (<div key={index} className="custom_select_option" onClick={() => handleWindowSelect(index)} style={{padding:'12px 14px',maxWidth:'100%'}}>
                          {window}
                        </div>))}
                      </div>}
                    </transition>
                  </div>
                </div>
                <div style={{marginTop: '15px'}}>
                  <div style={{display:'flex'}}>
                    <input className="checkbox" type="checkbox" checked={longTermMemory} onChange={() => setLongTermMemory(!longTermMemory)} />
                    <label className={styles.form_label} style={{marginLeft:'7px',cursor:'pointer'}} onClick={() => setLongTermMemory(!longTermMemory)}>
                      Long term memory
                    </label>
                  </div>
                </div>
                <div style={{marginTop: '10px'}}>
                  <label className={styles.form_label}>Choose an LTM database</label>
                  <div className="dropdown_container_search" style={{width:'100%'}}>
                    <div className="custom_select_container" onClick={() => setDatabaseDropdown(!databaseDropdown)} style={{width:'100%'}}>
                      {database}<Image width={20} height={21} src={!databaseDropdown ? '/images/dropdown_down.png' : '/images/dropdown_up.png'} alt="expand-icon"/>
                    </div>
                    <transition name="fade-scale">
                      {databaseDropdown && <div className="custom_select_options" ref={databaseRef} style={{width:'100%'}}>
                        {databases.map((data, index) => (<div key={index} className="custom_select_option" onClick={() => handleDatabaseSelect(index)} style={{padding:'12px 14px',maxWidth:'100%'}}>
                          {data}
                        </div>))}
                      </div>}
                    </transition>
                  </div>
                </div>
                <div style={{marginTop: '15px'}}>
                  <label className={styles.form_label}>Permission Type</label>
                  <div className="dropdown_container_search" style={{width:'100%'}}>
                    <div className="custom_select_container" onClick={() => setPermissionDropdown(!permissionDropdown)} style={{width:'100%'}}>
                      {permission}<Image width={20} height={21} src={!permissionDropdown ? '/images/dropdown_down.png' : '/images/dropdown_up.png'} alt="expand-icon"/>
                    </div>
                    <transition name="fade-scale">
                      {permissionDropdown && <div className="custom_select_options" ref={permissionRef} style={{width:'100%'}}>
                        {permissions.map((permit, index) => (<div key={index} className="custom_select_option" onClick={() => handlePermissionSelect(index)} style={{padding:'12px 14px',maxWidth:'100%'}}>
                          {permit}
                        </div>))}
                      </div>}
                    </transition>
                  </div>
                </div>
              </div>
            }
            <div style={{marginTop: '15px', display: 'flex', justifyContent: 'flex-end'}}>
              <button className={styles.agent_button} onClick={handleCreateClick}>Add agent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
  </>)
}