#include "stm32f4xx_hal.h"
#include <stdio.h>
#include <string.h>

/* UART handle */
UART_HandleTypeDef huart2;

/* BMS data structure */
typedef struct {
    float soc;        // State of Charge (%)
    float voltage;    // Battery Voltage (V)
    float current;    // Battery Current (A)
    float temperature; // Temperature (°C)  
} BMS_Data;

/* Buffer for received data */
uint8_t rx_buffer[50];
uint8_t rx_index = 0;
uint8_t rx_data;
BMS_Data bms_data = {0};

/* Function prototypes */
void SystemClock_Config(void);
void UART_Init(void);
void Receive_BMS_Data(void);
void Display_BMS_Data(BMS_Data *data);
void Error_Handler(void);

/* Main function */
int main(void) {
    HAL_Init();
    SystemClock_Config();
    UART_Init();

    /* Start UART reception in interrupt mode */
    HAL_UART_Receive_IT(&huart2, &rx_data, 1);

    while (1) {
        Receive_BMS_Data();
        Display_BMS_Data(&bms_data);
        HAL_Delay(1000); // Update every 1 second
    }
}

/* System Clock Configuration */
void SystemClock_Config(void) {
    RCC_OscInitTypeDef RCC_OscInitStruct = {0};
    RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

    __HAL_RCC_PWR_CLK_ENABLE();
    __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE1);

    RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
    RCC_OscInitStruct.HSEState = RCC_HSE_ON;
    RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
    RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
    RCC_OscInitStruct.PLL.PLLM = 8;
    RCC_OscInitStruct.PLL.PLLN = 336;
    RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV2;
    RCC_OscInitStruct.PLL.PLLQ = 7;
    if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK) {
        Error_Handler();
    }

    RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK | RCC_CLOCKTYPE_SYSCLK
                                | RCC_CLOCKTYPE_PCLK1 | RCC_CLOCKTYPE_PCLK2;
    RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
    RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
    RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV4;
    RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;
    if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_5) != HAL_OK) {
        Error_Handler();
    }
}

/* UART Initialization */
void UART_Init(void) {
    __HAL_RCC_USART2_CLK_ENABLE();
    __HAL_RCC_GPIOA_CLK_ENABLE();

    GPIO_InitTypeDef GPIO_InitStruct = {0};
    GPIO_InitStruct.Pin = GPIO_PIN_2 | GPIO_PIN_3;
    GPIO_InitStruct.Mode = GPIO_MODE_AF_PP;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_VERY_HIGH;
    GPIO_InitStruct.Alternate = GPIO_AF7_USART2;
    HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

    huart2.Instance = USART2;
    huart2.Init.BaudRate = 115200;
    huart2.Init.WordLength = UART_WORDLENGTH_8B;
    huart2.Init.StopBits = UART_STOPBITS_1;
    huart2.Init.Parity = UART_PARITY_NONE;
    huart2.Init.Mode = UART_MODE_TX_RX;
    huart2.Init.HwFlowCtl = UART_HWCONTROL_NONE;
    huart2.Init.OverSampling = UART_OVERSAMPLING_16;
    if (HAL_UART_Init(&huart2) != HAL_OK) {
        Error_Handler();
    }
}

/* Receive BMS data over UART */
void Receive_BMS_Data(void) {
    // Simulated data reception (replace with actual BMS IC communication)
    // Assuming data format: "SOC,Voltage,Current,Temperature\n"
    if (rx_index > 0 && rx_buffer[rx_index - 1] == '\n') {
        rx_buffer[rx_index - 1] = '\0'; // Null-terminate the string
        sscanf((char *)rx_buffer, "%f,%f,%f,%f", 
               &bms_data.soc, &bms_data.voltage, 
               &bms_data.current, &bms_data.temperature);
        rx_index = 0; // Reset buffer index
        memset(rx_buffer, 0, sizeof(rx_buffer)); // Clear buffer
    }
}

/* Display BMS data over UART */
void Display_BMS_Data(BMS_Data *data) {
    char tx_buffer[100];
    snprintf(tx_buffer, sizeof(tx_buffer),
             "BMS Data:\r\nSoC: %.1f%%\r\nVoltage: %.2fV\r\nCurrent: %.2fA\r\nTemperature: %.1f°C\r\n\r\n",
             data->soc, data->voltage, data->current, data->temperature);
    HAL_UART_Transmit(&huart2, (uint8_t *)tx_buffer, strlen(tx_buffer), HAL_MAX_DELAY);
}

/* UART receive complete callback */
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {
    if (huart->Instance == USART2) {
        if (rx_index < sizeof(rx_buffer) - 1) {
            rx_buffer[rx_index++] = rx_data;
        }
        HAL_UART_Receive_IT(&huart2, &rx_data, 1); // Restart reception
    }
}

/* Error handler */
void Error_Handler(void) {
    __disable_irq();
    while (1) {
    }
}