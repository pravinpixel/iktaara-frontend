import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

interface TrackingStatus {
  status_id: number;
  status_name: string;
  active: boolean;
}

interface OrderStepperProps {
  tracking: TrackingStatus[];
}
// const steps = [
//   'Order Placed',
//   'Order Confirmed',
//   'Order Shipped',
//   'Order Delivered',
// ];

// const steps = [
//   {
//     label: 'Select campaign settings',
//     description: `For each ad campaign that you create, you can control how much
//               you're willing to spend on clicks and conversions, which networks
//               and geographical locations you want your ads to show on, and more.`,
//   },
//   {
//     label: 'Create an ad group',
//     description:
//       'An ad group contains one or more ads which target a shared set of keywords.',
//   },
//   {
//     label: 'Create an ad',
//     description: `Try out different ad text to see what brings in the most customers,
//               and learn how to enhance your ads using features like ad extensions.
//               If you run into any problems with your ads, find out how to tell if
//               they're running and how to resolve approval issues.`,
//   },
// ];
const OrderStepper: React.FC<OrderStepperProps> = ({ tracking }) => {
  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };
  return (
    <>
      <Box display={{ xs: 'none', sm: 'block' }}>
        {/* <Stepper alternativeLabel>
          {tracking?.map((label, index) => {
            

            const isActive = label.active;
            return (
              <Step key={index}>
                <StepLabel
                  className={isActive ? 'activeStepLabel' : 'stepp'}
                  StepIconComponent={(props) =>
                    label?.active === true ? (
                      <CheckCircleIcon
                        {...props}
                        className="stepper-icon-new"
                      />
                    ) : (
                      <StepIcon {...props} />
                    )
                  }
                >
                  {label?.status_name}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper> */}
        <Stepper alternativeLabel>
          {tracking
            .filter((label) => label.active) // Filter to include only items where active is true
            .map((label, index) => {
              return (
                <Step key={index}>
                  <StepLabel
                    className="activeStepLabel"
                    // StepIconComponent={CheckCircleIcon}
                    StepIconComponent={(props) => (
                      <CheckCircleIcon
                        {...props}
                        className="stepper-icon-new"
                      />
                    )}
                  >
                    {label.status_name}
                  </StepLabel>
                </Step>
              );
            })}
        </Stepper>
      </Box>
      <Box display={{ xs: 'block', sm: 'none' }}>
        {/* <Stepper alternativeLabel orientation="vertical">
          {tracking?.map((label, index) => {
            const isActive = label.active;
            return (
              <Step key={index}>
                <StepLabel
                  className={isActive ? 'activeStepLabel' : 'stepp'}
                  StepIconComponent={(props) =>
                    label?.active === true ? (
                      <CheckCircleIcon
                        {...props}
                        className="stepper-icon-new"
                      />
                    ) : (
                      <StepIcon {...props} />
                    )
                  }
                >
                  {label?.status_name}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper> */}
        {/* <Stepper activeStep={activeStep} orientation="vertical">
          {tracking?.map((label, index) => {
            const isActive = label.active;
            return (
              <Step key={index}>
                <StepLabel
                  className={isActive ? 'activeStepLabel' : 'stepp'}
                  StepIconComponent={(props) =>
                    label?.active === true ? (
                      <CheckCircleIcon
                        {...props}
                        className="stepper-icon-new"
                      />
                    ) : (
                      <StepIcon {...props} />
                    )
                  }
                >
                  {label?.status_name}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper> */}
        <Stepper
          alternativeLabel
          orientation="vertical"
          sx={{ alignItems: 'center' }}
        >
          {tracking
            .filter((label) => label.active) // Filter to include only items where active is true
            .map((label, index) => {
              return (
                <Step key={index}>
                  <StepLabel
                    className="activeStepLabel"
                    // StepIconComponent={CheckCircleIcon}
                    StepIconComponent={(props) => (
                      <CheckCircleIcon
                        {...props}
                        className="stepper-icon-new"
                      />
                    )}
                  >
                    {label.status_name}
                  </StepLabel>
                </Step>
              );
            })}
        </Stepper>
      </Box>
    </>
  );
};

export default OrderStepper;
