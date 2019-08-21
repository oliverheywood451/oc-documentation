import React from 'react';
import { groupBy as _groupBy, map as _map, find as _find } from 'lodash';
import { Paper, Collapse, List, ListItem, ListItemText, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import OpenApi from '../../openapi.service';
import { Section as SectionModel, Guide } from '../../models/section.model'

interface ApiReferenceProps {
  name: string;
  x_section_id: string;
  x_id: string;
  description: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
)

const findActiveSection = (sections: any, path: string) => {
  return sections.findIndex(s => {
    return (
      s.guides.filter(g => {
        return g.path === path || g.path + '/' === path
      }).length > 0
    )
  })
}

export default function ApiReferenceMenu(props) {
  const { ocApi, sectionResources, resourceOperations, currentPath, activeSection, sectionChange, resourceChange, operationChange } = props;

  // const [activeIndex, setActiveIndex] = React.useState(
  //   findActiveSection(allSections, currentPath)
  // )

  // if there is an active resource then map over operations

  return (
    <Paper>
      {_map(ocApi.sections, (section, index) => {
        return (
          <Section key={index}
            section={section}
            ocApi={ocApi}
            // resources={matchingResources}
            // resourceOperations={resourceOperations}
            sectionChange={sectionChange}
            resourceChange={resourceChange}
            operationChange={operationChange}
            activeSection={activeSection} />
        )
      })}
    </Paper>
  )
}

function Section(props) {
  const { section, ocApi, sectionChange, resourceChange, operationChange, activeSection } = props;
  const classes = useStyles(props);
  // const isActive = section['x-id'] === activeSection.x_id;
  const [open, setOpen] = React.useState(false);

  const resources = ocApi.resources.filter(r => r['x-section-id'] == section['x-id']);
  console.log('here');

  function handleClick() {
    setOpen(!open)
    if (!open) {
      sectionChange(section);
    }
  }

  return (
    <List className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemText>
          <Typography>
            1. {section.name}
          </Typography>
        </ListItemText>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {resources.map((resource, index) => <Resource key={index} resource={resource} ocApi={ocApi} operationChange={operationChange} resourceChange={resourceChange} />)}
      </Collapse>
    </List>
  )
}

function Resource(props) {
  const { resource, ocApi, resourceOperations, operationChange, resourceChange } = props;
  const [open, setOpen] = React.useState(false);

  console.log('here');
  const operations = OpenApi.operationsByResource[resource.name];
  console.log('operations', operations);

  function handleClick() {
    setOpen(!open)
    if (!open) {
      resourceChange(resource.name);
    }
  }

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText>
          2. {resource.name}
        </ListItemText>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {resourceOperations && resourceOperations.length ? resourceOperations.map((o, index) => {
            return (
              <ListItem key={index} onClick={() => operationChange(o)}>
                <ListItemText primary={o.summary.replace(/\./g, ' ')} />
              </ListItem>
            )
          }) : null}
        </List>
      </Collapse>
    </List>
  )
}