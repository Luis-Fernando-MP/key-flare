import { acl } from '@/shared/acl'
import Logo from '@/shared/assets/Logo'
import RangeSlider from '@/shared/components/RangeSlider'
import { type JSX } from 'react'

import useConfigurations from '../../hooks/useConfigurations'
import {
  ECounterStyle,
  ECursorStyle,
  EFreedomMode,
  EGameDifficulty,
  EModeOption,
  ERestartKey,
  EWritingSound
} from '../../store/useGameRulesStore'
import AppTheme from '../AppTheme'

const ConfigurationsList = (): JSX.Element => {
  const {
    gameDifficulty,
    restartKey,
    modeOption,
    freedomMode,
    writingSound,
    writingVolume,
    counterStyle,
    fontSize,
    cursorStyle,
    writeValidation,

    handleGameDifficulty,
    handleRestartKey,
    handleModeOption,
    handleFreedomMode,
    handleWritingSound,
    handleWritingVolume,
    handleCounterStyle,
    handleFontSize,
    handleCursorStyle,
    handleWriteValidation
  } = useConfigurations()

  return (
    <article className='appConf-list'>
      <div className='appConf-list__group' id='behavior'>
        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Dificultad</h5>
          <p className='appConf-sectionControl__description'>
            {gameDifficulty === EGameDifficulty.NORMAL &&
              'Experiencia clásica, puedes corregir errores al escribir.'}
            {gameDifficulty === EGameDifficulty.DIFFICULT &&
              'Se permite cometer errores dentro de una palabra, asi como barrar las letras dentro de un apalabra errada.'}
            {gameDifficulty === EGameDifficulty.MASTER &&
              'No se aprueba ninguna palabra incorrecta, lo que permite asegurar una precision del 100%. 1 Palabra x segundo'}
          </p>
          <div className='appConf-sectionControl__options'>
            {Object.values(EGameDifficulty).map(option => (
              <button
                key={option}
                className={acl(gameDifficulty === option)}
                onClick={() => handleGameDifficulty(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Tipo de reinicio</h5>
          <p className='appConf-sectionControl__description'>
            Usa una tecla {restartKey} para reiniciar o ir a la pagina de prueba rápidamente
          </p>
          <div className='appConf-sectionControl__options'>
            {Object.values(ERestartKey).map(option => (
              <button
                key={option}
                className={acl(restartKey === option)}
                onClick={() => handleRestartKey(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Opciones de Modo</h5>
          <p className='appConf-sectionControl__description'>
            {modeOption === EModeOption.AGILE &&
              'Uso típico, se muestra el historial de palabras y el teclado virtual'}
            {modeOption === EModeOption.BLIND &&
              'No se resaltan los errores ni las palabras incorrectas. Te ayuda a concentrarte en la velocidad bruta.'}
            {modeOption === EModeOption.FOCUSED &&
              'Unicamente se resaltan las palabras restantes, esto ayuda a una mejor concentración de los objetivos'}
          </p>
          <div className='appConf-sectionControl__options'>
            {Object.values(EModeOption).map(option => (
              <button
                key={option}
                className={acl(modeOption === option)}
                onClick={() => handleModeOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className='appConf-list__group' id='themes'>
        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Temas</h5>
          <AppTheme />
        </section>
      </div>

      <div className='appConf-list__group' id='appearance'>
        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Modo de Libertad</h5>
          <p className='appConf-sectionControl__description'>
            Permite eliminar palabras incluso si están bien escritas.
          </p>
          <div className='appConf-sectionControl__options'>
            <button
              className={acl(freedomMode === EFreedomMode.DISABLED)}
              onClick={() => handleFreedomMode(EFreedomMode.DISABLED)}
            >
              Desactivado
            </button>
            <button
              className={acl(freedomMode === EFreedomMode.ENABLED)}
              onClick={() => handleFreedomMode(EFreedomMode.ENABLED)}
            >
              Activado
            </button>
          </div>
        </section>

        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Ignorar caracteres especiales</h5>
          <p className='appConf-sectionControl__description'>
            Permite evitar la validación de caracteres especiales como las tildes.
          </p>
          <div className='appConf-sectionControl__options'>
            <button
              className={acl(!writeValidation)}
              onClick={() => handleWriteValidation(!writeValidation)}
            >
              Desactivado
            </button>
            <button
              className={acl(writeValidation)}
              onClick={() => handleWriteValidation(!writeValidation)}
            >
              Activado
            </button>
          </div>
        </section>
        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Estilo del contador</h5>
          <p className='appConf-sectionControl__description'>
            Modifica la apariencia del contador de palabras durante la prueba.
          </p>
          <div className='appConf-sectionControl__options'>
            {Object.values(ECounterStyle).map(option => (
              <button
                key={option}
                className={acl(counterStyle === option)}
                onClick={() => handleCounterStyle(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Tamaño de fuente</h5>
          <p className='appConf-sectionControl__description'>
            Cambia el tamaño de fuente de las palabras de la prueba.
          </p>
          <RangeSlider min={10} max={30} range={fontSize} onChange={handleFontSize} />
        </section>

        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Estilo del Cursor</h5>
          <p className='appConf-sectionControl__description'>
            Permite cambiar el estilo del cursor durante la prueba.
          </p>
          <div className='appConf-sectionControl__options'>
            {Object.entries(ECursorStyle).map(option => {
              const [name, value] = option
              return (
                <button
                  key={name}
                  className={acl(cursorStyle === name)}
                  onClick={() => handleCursorStyle(name)}
                >
                  {value}
                </button>
              )
            })}
            <button
              className={`flare ${acl((cursorStyle as any) === 'flare')}`}
              onClick={() => handleCursorStyle('flare')}
            >
              <Logo />
            </button>
          </div>
        </section>
      </div>

      <div className='appConf-list__group' id='sounds'>
        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Tipos de sonido de escritura</h5>
          <p className='appConf-sectionControl__description'>
            Escoge entre los tipos de sonidos para la escritura.
          </p>
          <div className='appConf-sectionControl__options'>
            {Object.entries(EWritingSound).map(option => {
              const [name, value] = option
              return (
                <button
                  key={name}
                  className={acl(writingSound === name)}
                  onClick={() => handleWritingSound(name)}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </section>
        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Volumen de escritura</h5>
          <p className='appConf-sectionControl__description'>
            Ajusta el volumen de los sonidos de escritura.
          </p>
          <RangeSlider range={writingVolume} onChange={handleWritingVolume} />
        </section>
      </div>
    </article>
  )
}

export default ConfigurationsList
