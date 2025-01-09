import { acl } from '@/shared/acl'
import RangeSlider from '@/shared/components/RangeSlider'
import type { JSX } from 'react'

import useConfigurations from '../../hooks/useConfigurations'
import {
  ECounterStyle,
  ECursorStyle,
  EEndOnError,
  EFont,
  EFreedomMode,
  EGameDifficulty,
  EModeOption,
  ERestartKey,
  EWritingSound
} from '../../store/useGameRulesStore'

const ConfigurationsList = (): JSX.Element => {
  const {
    gameDifficulty,
    restartKey,
    modeOption,
    freedomMode,
    endOnError,
    writingSound,
    writingVolume,
    counterStyle,
    fontSize,
    webFont,
    cursorStyle,
    handleGameDifficulty,
    handleRestartKey,
    handleModeOption,
    handleFreedomMode,
    handleEndOnError,
    handleWritingSound,
    handleWritingVolume,
    handleCounterStyle,
    handleFontSize,
    handleWebFont,
    handleCursorStyle
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
            Usa una tecla para reiniciar o ir a la pagina de prueba rápidamente
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
            Siempre muestra el historial de la palabra
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

      <div className='appConf-list__group' id='input'>
        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Velocidad Mínima</h5>
          <p className='appConf-sectionControl__description'>
            Falla si tu velocidad baja de un límite.
          </p>
          <div className='appConf-sectionControl__options'>
            <input type='number' defaultValue={100} />
            <button className='active'>Apagado</button>
            <button>Personalizado</button>
          </div>
        </section>

        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Precisión Mínima</h5>
          <p className='appConf-sectionControl__description'>
            Falla si tu precisión baja de un límite.
          </p>
          <div className='appConf-sectionControl__options'>
            <input type='number' defaultValue={100} />
            <button className='active'>Apagado</button>
            <button>Personalizado</button>
          </div>
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
          <h5 className='appConf-sectionControl__title'>Termina por error</h5>
          <p className='appConf-sectionControl__description'>
            En el modo letra, la prueba se detiene al cometer un error.
          </p>
          <div className='appConf-sectionControl__options'>
            {Object.values(EEndOnError).map(option => (
              <button
                key={option}
                className={acl(endOnError === option)}
                onClick={() => handleEndOnError(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Caracteres especiales</h5>
          <p className='appConf-sectionControl__description'>
            Permite evitar la validación de caracteres especiales.
          </p>
          <div className='appConf-sectionControl__options'>
            <button
              className={acl(writingSound === EWritingSound.BEEP)}
              onClick={() => handleWritingSound(EWritingSound.BEEP)}
            >
              beep
            </button>
            <button
              className={acl(writingSound === EWritingSound.PENTATONIC)}
              onClick={() => handleWritingSound(EWritingSound.PENTATONIC)}
            >
              pentatonic
            </button>
            <button
              className={acl(writingSound === EWritingSound.POP)}
              onClick={() => handleWritingSound(EWritingSound.POP)}
            >
              pop
            </button>
          </div>
        </section>
      </div>

      <div className='appConf-list__group' id='sounds'>
        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Volumen de escritura</h5>
          <p className='appConf-sectionControl__description'>
            Ajusta el volumen de los sonidos de escritura.
          </p>
          <RangeSlider range={writingVolume} onChange={handleWritingVolume} />
        </section>
      </div>

      <div className='appConf-list__group' id='themes'>
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
          <RangeSlider range={fontSize} onChange={handleFontSize} />
        </section>

        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Fuente de letra de la web</h5>
          <p className='appConf-sectionControl__description'>
            Cambia la fuente de letra de las palabras de la aplicación web.
          </p>
          <div className='appConf-sectionControl__options'>
            {Object.values(EFont).map(option => (
              <button
                key={option}
                className={acl(webFont === option)}
                onClick={() => handleWebFont(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className='appConf-sectionControl'>
          <h5 className='appConf-sectionControl__title'>Estilo del Cursor</h5>
          <p className='appConf-sectionControl__description'>
            Permite cambiar el estilo del cursor durante la prueba.
          </p>
          <div className='appConf-sectionControl__options'>
            {Object.values(ECursorStyle).map(option => (
              <button
                key={option}
                className={acl(cursorStyle === option)}
                onClick={() => handleCursorStyle(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}

export default ConfigurationsList
