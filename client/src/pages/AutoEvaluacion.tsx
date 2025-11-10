import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ClipboardCheck,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Building2,
  Scale,
  Leaf,
  ArrowRight,
  Info,
  Award,
  XCircle
} from "lucide-react";

interface Question {
  id: string;
  category: string;
  question: string;
  type: "boolean" | "radio";
  weight: number;
  options?: { value: string; label: string; points: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: "legal_entity",
    category: "Información Legal",
    question: "¿Su empresa tiene RUT válido y está inscrita en el SII?",
    type: "boolean",
    weight: 15
  },
  {
    id: "industry",
    category: "Información Legal",
    question: "¿Pertenece a la industria minera o de energías renovables?",
    type: "boolean",
    weight: 10
  },
  {
    id: "packaging_volume",
    category: "Cumplimiento REP",
    question: "¿Su empresa maneja menos de 300 kg de envases/embalajes al año?",
    type: "boolean",
    weight: 20
  },
  {
    id: "packaging_tracking",
    category: "Cumplimiento REP",
    question: "¿Tiene registros de peso/volumen de sus envases y embalajes?",
    type: "radio",
    weight: 15,
    options: [
      { value: "complete", label: "Sí, registros completos y actualizados", points: 15 },
      { value: "partial", label: "Parcialmente, algunos registros", points: 8 },
      { value: "none", label: "No tengo registros", points: 0 }
    ]
  },
  {
    id: "documentation",
    category: "Documentación",
    question: "¿Cuenta con certificado de inicio de actividades vigente?",
    type: "boolean",
    weight: 10
  },
  {
    id: "technical_sheets",
    category: "Documentación",
    question: "¿Tiene fichas técnicas de sus productos con información de envases?",
    type: "radio",
    weight: 10,
    options: [
      { value: "complete", label: "Sí, fichas técnicas completas", points: 10 },
      { value: "partial", label: "Tengo algunas fichas", points: 5 },
      { value: "none", label: "No tengo fichas técnicas", points: 0 }
    ]
  },
  {
    id: "environmental_compliance",
    category: "Sostenibilidad",
    question: "¿Su empresa cuenta con certificaciones ambientales (ISO 14001, u otras)?",
    type: "radio",
    weight: 10,
    options: [
      { value: "yes", label: "Sí, tengo certificaciones vigentes", points: 10 },
      { value: "in_process", label: "En proceso de certificación", points: 5 },
      { value: "no", label: "No tengo certificaciones", points: 0 }
    ]
  },
  {
    id: "waste_management",
    category: "Sostenibilidad",
    question: "¿Tiene procesos documentados de manejo y disposición de residuos?",
    type: "boolean",
    weight: 10
  }
];

export default function AutoEvaluacion() {
  const [, navigate] = useLocation();
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const handleBooleanChange = (questionId: string, checked: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: checked }));
  };

  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;

    QUESTIONS.forEach(q => {
      maxScore += q.weight;
      
      if (q.type === "boolean") {
        if (answers[q.id] === true) {
          totalScore += q.weight;
        }
      } else if (q.type === "radio" && q.options) {
        const selectedOption = q.options.find(opt => opt.value === answers[q.id]);
        if (selectedOption) {
          totalScore += selectedOption.points;
        }
      }
    });

    return {
      score: totalScore,
      maxScore,
      percentage: Math.round((totalScore / maxScore) * 100)
    };
  };

  const getRecommendations = (percentage: number) => {
    const recommendations = [];

    if (!answers.legal_entity) {
      recommendations.push({
        icon: XCircle,
        type: "critical",
        text: "Debe tener RUT válido y estar inscrito en el SII"
      });
    }

    if (!answers.packaging_volume) {
      recommendations.push({
        icon: AlertCircle,
        type: "warning",
        text: "Su volumen de envases puede requerir un sistema de gestión REP diferente"
      });
    }

    if (answers.packaging_tracking === "none" || !answers.packaging_tracking) {
      recommendations.push({
        icon: AlertCircle,
        type: "warning",
        text: "Debe implementar un sistema de registro de peso y volumen de envases"
      });
    }

    if (!answers.documentation) {
      recommendations.push({
        icon: AlertCircle,
        type: "warning",
        text: "Necesita obtener certificado de inicio de actividades vigente"
      });
    }

    if (answers.technical_sheets === "none" || !answers.technical_sheets) {
      recommendations.push({
        icon: Info,
        type: "info",
        text: "Recomendamos crear fichas técnicas de sus productos antes de solicitar certificación"
      });
    }

    if (answers.environmental_compliance === "no") {
      recommendations.push({
        icon: Info,
        type: "info",
        text: "Certificaciones ambientales pueden mejorar su puntaje ESG"
      });
    }

    if (!answers.waste_management) {
      recommendations.push({
        icon: Info,
        type: "info",
        text: "Documente sus procesos de manejo de residuos para mejorar su evaluación"
      });
    }

    return recommendations;
  };

  const getReadinessLevel = (percentage: number) => {
    if (percentage >= 80) {
      return {
        level: "Listo para Certificar",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950",
        icon: Award,
        message: "¡Excelente! Su empresa cumple con los requisitos principales para solicitar certificación REP."
      };
    } else if (percentage >= 60) {
      return {
        level: "Casi Listo",
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-50 dark:bg-yellow-950",
        icon: TrendingUp,
        message: "Su empresa está en buen camino. Complete los requisitos pendientes para mejorar su evaluación."
      };
    } else {
      return {
        level: "Requiere Preparación",
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-50 dark:bg-red-950",
        icon: AlertCircle,
        message: "Su empresa necesita cumplir más requisitos antes de solicitar certificación."
      };
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFormComplete = () => {
    return QUESTIONS.every(q => answers[q.id] !== undefined);
  };

  const results = showResults ? calculateScore() : null;
  const readiness = results ? getReadinessLevel(results.percentage) : null;
  const recommendations = results ? getRecommendations(results.percentage) : [];

  const categoryGroups = QUESTIONS.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {} as Record<string, Question[]>);

  return (
    <div className="container mx-auto p-6 max-w-5xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Auto-Evaluación REP</h1>
        </div>
        <p className="text-muted-foreground">
          Evalúe si su empresa cumple con los requisitos para certificación REP según Ley 20.920
        </p>
      </div>

      {/* Results Card */}
      {showResults && results && readiness && (
        <Card className={readiness.bgColor}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <readiness.icon className={`w-8 h-8 ${readiness.color}`} />
              <div className="flex-1">
                <CardTitle className={readiness.color}>{readiness.level}</CardTitle>
                <CardDescription>{readiness.message}</CardDescription>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${readiness.color}`}>
                  {results.percentage}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {results.score} de {results.maxScore} puntos
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={results.percentage} className="h-3" />
            
            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Recomendaciones:</h3>
                {recommendations.map((rec, idx) => (
                  <Alert key={idx} variant={rec.type === "critical" ? "destructive" : "default"}>
                    <rec.icon className="h-4 w-4" />
                    <AlertDescription>{rec.text}</AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {results.percentage >= 60 && (
                <Button 
                  onClick={() => navigate("/solicitar-certificacion")}
                  data-testid="button-request-certification"
                  size="lg"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Solicitar Certificación
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowResults(false);
                  setAnswers({});
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                data-testid="button-restart"
              >
                Reiniciar Evaluación
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questionnaire */}
      {!showResults && (
        <div className="space-y-6">
          {Object.entries(categoryGroups).map(([category, questions]) => {
            const categoryIcons: Record<string, any> = {
              "Información Legal": Scale,
              "Cumplimiento REP": Building2,
              "Documentación": FileText,
              "Sostenibilidad": Leaf
            };
            const CategoryIcon = categoryIcons[category] || ClipboardCheck;

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-primary" />
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {questions.map((q) => (
                    <div key={q.id} className="space-y-3 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <Label className="text-base font-medium leading-relaxed flex-1">
                          {q.question}
                        </Label>
                        <Badge variant="outline" className="shrink-0">
                          {q.weight} pts
                        </Badge>
                      </div>
                      
                      {q.type === "boolean" ? (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={q.id}
                            checked={answers[q.id] as boolean || false}
                            onCheckedChange={(checked) => 
                              handleBooleanChange(q.id, checked as boolean)
                            }
                            data-testid={`checkbox-${q.id}`}
                          />
                          <Label 
                            htmlFor={q.id}
                            className="text-sm font-normal cursor-pointer"
                          >
                            Sí, cumplimos con este requisito
                          </Label>
                        </div>
                      ) : (
                        <RadioGroup
                          value={answers[q.id] as string}
                          onValueChange={(value) => handleRadioChange(q.id, value)}
                        >
                          {q.options?.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value={option.value} 
                                id={`${q.id}-${option.value}`}
                                data-testid={`radio-${q.id}-${option.value}`}
                              />
                              <Label
                                htmlFor={`${q.id}-${option.value}`}
                                className="text-sm font-normal cursor-pointer flex items-center gap-2"
                              >
                                {option.label}
                                <span className="text-xs text-muted-foreground">
                                  ({option.points} pts)
                                </span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}

          {/* Submit Button */}
          <Card>
            <CardContent className="pt-6">
              <Button
                onClick={handleSubmit}
                disabled={!isFormComplete()}
                size="lg"
                className="w-full"
                data-testid="button-submit-evaluation"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Ver Resultados de Evaluación
              </Button>
              {!isFormComplete() && (
                <p className="text-sm text-muted-foreground text-center mt-3">
                  Complete todas las preguntas para ver sus resultados
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Footer */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Información Importante</AlertTitle>
        <AlertDescription>
          Esta auto-evaluación es orientativa y no garantiza la aprobación de su certificación. 
          El proceso oficial incluye evaluación documental, auditoría operativa y revisión por 
          comité técnico según los procedimientos establecidos en Ley 20.920.
        </AlertDescription>
      </Alert>
    </div>
  );
}
